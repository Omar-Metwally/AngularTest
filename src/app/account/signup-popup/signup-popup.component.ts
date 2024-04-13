import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, FormBuilder, FormControl, FormGroup, PatternValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, UniqueEmailValidator } from '../account.service';
import { LoginPopUpComponent } from '../login-popup/login-popup.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-signup-popup',
  standalone: true,
  imports: [MatCheckboxModule,MatButtonModule,MatCardModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, SharedModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule ],
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css'
})
export class SignupPopupComponent implements OnInit {
resendEmailConfirmationLink() {
throw new Error('Method not implemented.');
}
  signupForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;

  email: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email, Validators.pattern('\\b\\S+@(gmail|hotmail|yahoo|outlook)\\.com\\b')],
    asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
    updateOn: 'blur'
  });
  
  firstName: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],});
  
  lastName: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],});

  password: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@\$]).{8,}$')],});
  

  hide: any;

  constructor(public dialogRef: MatDialogRef<LoginPopUpComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private uniqueEmailValidator: UniqueEmailValidator,
    private router: Router,
    private dialog: MatDialog
    ) {

  }


  ngOnInit(): void {
    this.initializeForm();
  }

  signup() {
    this.submitted = true;
    this.errorMessages = [];


    if (this.signupForm.valid) {
      this.accountService.register(this.signupForm.value).subscribe({
        next: _ => {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
          this.dialogRef.close();
        },

        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }

  initializeForm() {

    this.signupForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  closeSignupPopUp() {
    this.dialogRef.close();
  }

  emailCheck(email: FormControl){
    this.accountService.checkEmail(email)
  }

   forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  openLoginPopUp() {
    this.dialogRef.close();
    this.dialog.open(LoginPopUpComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '25%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration: '500mx',
      exitAnimationDuration: '250ms'
    });
  }

}


