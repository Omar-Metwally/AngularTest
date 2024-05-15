import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { AuthService } from 'src/app/api/services';
import { AuthResetPasswordPut$Params } from 'src/app/api/fn/auth/auth-reset-password-put';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopUpComponent } from '../login-popup/login-popup.component';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  token: string | undefined;
  email: string | undefined;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private accountService: AccountService,
    public dialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              this.token = params.get('token');
              this.email = params.get('email');

              if (this.token && this.email) {
                this.initializeForm(this.email);
              } else {
                this.router.navigateByUrl('/account/login');
              }
            }
          })
        }
      }
    })
  }


  initializeForm(username: string) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [{value: username, disabled: true}],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    }, { validator: passwordMatchValidator });
  }

  get f() { return this.resetPasswordForm.controls; }

  resetPassword() {
    this.submitted = true;
    this.errorMessages = [];
    console.log(this.resetPasswordForm)
    if (this.resetPasswordForm.valid && this.email && this.token) {
      const request: AuthResetPasswordPut$Params = {
        body: {
          token: this.token,
          email: this.email,
          newPassword: this.resetPasswordForm.get('newPassword')?.value    
        }
      };

      this.authService.authResetPasswordPut(request).subscribe({
        next: (response: any) => {
          this.sharedService.hideLoadingSpinner()
          this.login('500mx', '250ms');
          this.sharedService.showSnackBar('Password Resetted, you can login now');
        }, error: error => {
          this.sharedService.showPopUp('danger',error[0]);
        }
      })
    }
  }

  login(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginPopUpComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '20%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
}


export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  return newPassword && confirmPassword && newPassword.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};