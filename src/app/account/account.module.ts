import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPopUpComponent } from './login-popup/login-popup.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
//import { AutocompleteRequireSelectionExample } from './chief-register/chief-register.component';
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import { ChiefSignupComponent } from './chief-signup/chief-signup.component';




@NgModule({
  declarations: [
    ConfirmEmailComponent,
    SendEmailComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    LoginPopUpComponent,
    SignupPopupComponent,
    ChiefSignupComponent
  ]
})
export class AccountModule { }
