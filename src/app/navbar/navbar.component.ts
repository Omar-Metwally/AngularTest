import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../account/account.service';
import { LoginPopUpComponent } from '../account/login-popup/login-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SignupPopupComponent } from '../account/signup-popup/signup-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from "../side-nav/side-nav.component";
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [MatBadgeModule ,MatDividerModule, MatButtonModule, MatMenuModule, MatIconModule, CommonModule, LoginPopUpComponent, SignupPopupComponent, SharedModule, SideNavComponent]
})
export class NavbarComponent {

  collapsed = true;
  constructor(public accountService: AccountService,public dialog: MatDialog) {
   }
  logout() {
    this.accountService.logout();
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
    console.log(this.accountService.cart$)
  }

  signup(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SignupPopupComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '25%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
