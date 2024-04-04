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
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';




@Component({
  selector: 'login',
  templateUrl: 'login-popup.component.html',
  styleUrl: 'login-popup.component.css',
  standalone: true,
  imports: [MatButtonModule,MatCardModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, SharedModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatGridListModule ]
})
export class LoginPopUpComponent implements OnInit {
  email: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    updateOn: 'blur'
  });
  password: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(8)],});


  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;
  hide: any;
  isLoading:boolean=false;


  constructor(public dialogRef: MatDialogRef<LoginPopUpComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
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
      this.isLoading=true;
      this.accountService.login(this.loginForm.value).subscribe({
        next: _ => {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
          this.isLoading=false;
          this.dialogRef.close();
        },
        
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
          this.isLoading=false;
        }
      })
    }
  }
  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }
  closeLoginPopUp(){
    this.dialogRef.close();
  }
}
