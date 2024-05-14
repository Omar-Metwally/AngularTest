import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { MenuItem } from 'src/app/chief/dashboard/side-nav/side-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-admin-side-nav',
  standalone: true,
  imports: [RouterModule,MatButtonModule, MatMenuModule,SharedModule, CommonModule ,MatListModule ,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule],
  templateUrl: './admin-side-nav.component.html',
  styleUrl: './admin-side-nav.component.css'
})
export class AdminSideNavComponent {
  collapsed = false;

  constructor(public accountService: AccountService){

  }

  menuItems: MenuItem[] = [
    {
      icon: 'assignment_ind',
      label:'Pending Chiefs',
      route:'pending-chiefs'
    },
    {
      icon: 'person',
      label:'Customers Overview',
      route:'customers'
    },
    {
      icon: 'person',
      label:'Chiefs Overview',
      route:'chiefs'
    },
    {
      icon: 'rice_bowl',
      label:'Meals Overview',
      route:'meals'
    }
  ];
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  logout(){
    this.accountService.logout();
  }

  get sidenavWidth(): string {
    return this.collapsed ? '65px' : '250px';
  }

}
