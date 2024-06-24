import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { CommonModule, DOCUMENT } from '@angular/common';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { AuthResendEmailConfirmationEmailPost$Params } from 'src/app/api/fn/auth/auth-resend-email-confirmation-email-post';
import { AuthService } from 'src/app/api/services';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthResetPasswordPut$Params } from 'src/app/api/fn/auth/auth-reset-password-put';
import { AuthForgotPasswordEmailPost$Params } from 'src/app/api/fn/auth/auth-forgot-password-email-post';




@Component({
  selector: 'login',
  templateUrl: 'login-popup.component.html',
  styleUrl: 'login-popup.component.css',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, SharedModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule]
})
export class LoginPopUpComponent implements OnInit {
  email: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    updateOn: 'blur'
  });
  password: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(8)],
  });


  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  failedLogin = false;
  hide: any;
  isLoading: boolean = false;
  showEmailConfirm = false


  constructor(public dialogRef: MatDialogRef<LoginPopUpComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              if (params) {
                this.returnUrl = params.get('returnUrl');
              }
            }
          })
        }
      }
    })
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    })
  }
  login() {
    this.submitted = true;
    this.errorMessages = [];


    if (this.loginForm.valid) {
      this.isLoading = true;
      this.accountService.login(this.loginForm.value).subscribe({
        next: _ => {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
          this.isLoading = false;
          this.dialogRef.close();
        },

        error: error => {
          if (error.status === 409) {
            this.showEmailConfirm = true
          }
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
          this.failedLogin = true;
          this.isLoading = false;
        }
      })
    }
  }
  resendEmailConfirmationLink() {
    const request: AuthResendEmailConfirmationEmailPost$Params = {
      email: this.email.value
    }
    this.sharedService.showLoadingSpinner();
    this.authService.authResendEmailConfirmationEmailPost(request).subscribe({
      next: (response: any) => {
        this.sharedService.hideLoadingSpinner();
        this.sharedService.showPopUp('succuss','Email Sent, please check your email');
      }, error: error => {
        this.sharedService.hideLoadingSpinner();
        this.sharedService.showPopUp('danger','Failed, please try again later');
      }
    })
  }
  resetPassword() {
    // this.router.navigateByUrl('/account/send-email/forgot-username-or-password');
    // this.closeLoginPopUp()

    const request: AuthForgotPasswordEmailPost$Params = {
        email: this.email.value
    }
    this.sharedService.showLoadingSpinner();
    this.authService.authForgotPasswordEmailPost(request).subscribe({
      next: (response: any) => {
        this.sharedService.hideLoadingSpinner();
        this.sharedService.showPopUp('succuss','Email Sent, please check your email');
      }, error: error => {
        this.sharedService.hideLoadingSpinner();
        this.sharedService.showPopUp('danger','Failed, please try again later');
      }
    })

  }
  closeLoginPopUp() {
    this.dialogRef.close();
  }
  openSignupPopUp() {
    this.dialogRef.close();
    this.dialog.open(SignupPopupComponent, {
      width: '500px',
      height: 'min-content',
      minWidth: '300px',
      maxWidth: '100%',
      maxHeight: '100%',
      enterAnimationDuration: '500mx',
      exitAnimationDuration: '250ms'
    });
  }
}
