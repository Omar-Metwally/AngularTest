import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';
import { ConfirmEmail } from 'src/app/shared/models/account/confirmEmail';
import { AuthService } from 'src/app/api/services';
import { AuthResendEmailConfirmationEmailPost$Params } from 'src/app/api/fn/auth/auth-resend-email-confirmation-email-post';
import { AuthEmailConfirmationGet$Params } from 'src/app/api/fn/auth/auth-email-confirmation-get';
import { LoginPopUpComponent } from '../login-popup/login-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  success = true;

  constructor(private accountService: AccountService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sharedService.showLoadingSpinner()
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) =>{
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              const request: AuthEmailConfirmationGet$Params = {
                userID: params.get('userID'),
                token: params.get('token'),
              }
              this.authService.authEmailConfirmationGet(request).subscribe({
                next: (response: any) => {
                  this.sharedService.hideLoadingSpinner()
                  this.login('500mx', '250ms');
                  this.sharedService.showSnackBar('Email Confirmed, you can login now');
                  this.router.navigateByUrl('/');
                }, error: error => {
                  this.sharedService.hideLoadingSpinner()
                  this.router.navigateByUrl('/');
                  this.sharedService.showPopUp('danger','Failed, please try again later');
                }
              })
            }
          })
        }
      }
    })
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

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }

}
