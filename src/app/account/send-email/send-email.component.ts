import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { AuthResendEmailConfirmationEmailPost$Params } from 'src/app/api/fn/auth/auth-resend-email-confirmation-email-post';
import { AuthService } from 'src/app/api/services';
import { AuthResetPasswordPut$Params } from 'src/app/api/fn/auth/auth-reset-password-put';
import { AuthForgotPasswordEmailPost$Params } from 'src/app/api/fn/auth/auth-forgot-password-email-post';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService,
    private authService: AuthService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          const mode = this.activatedRoute.snapshot.paramMap.get('mode');
          if (mode) {
            this.mode = mode;
            this.initializeForm();
          }
        }
      }
    })
  }

  initializeForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('\\b\\S+@(gmail|hotmail|yahoo|outlook)\\.com\\b')]],
    })
  }

  sendEmail() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.emailForm.valid && this.mode) {
      if (this.mode.includes('resend-email-confirmation-link')) {
        const request: AuthResendEmailConfirmationEmailPost$Params = {
          email: this.emailForm.get('email')?.value
        }
        this.authService.authResendEmailConfirmationEmailPost(request).subscribe({
          next: (response: any) => {
            this.sharedService.showPopUp('succuss','Email Sent, please check your email');
            this.router.navigateByUrl('/');
          }, error: error => {
            this.sharedService.showPopUp('danger','Failed, please try again later');
          }
        })
      } else if (this.mode.includes('forgot-username-or-password')) {
        const request: AuthForgotPasswordEmailPost$Params = {
          email: this.emailForm.get('email')?.value
        }
        this.authService.authForgotPasswordEmailPost(request).subscribe({
          next: (response: any) => {
            this.sharedService.showPopUp('succuss','Email Sent, please check your email');
          }, error: error => {
            this.sharedService.showPopUp('danger',error[0]);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/account/login');
  }


}
