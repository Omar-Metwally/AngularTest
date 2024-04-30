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
      icon: 'person',
      label:'My Profile',
      route:'profile'
    },
    {
      icon: 'ramen_dining',
      label:'My Menu',
      route:''
    },
    {
      icon: 'local_shipping',
      label:'Orders',
      route:'orders'
    },
    {
      icon: 'history',
      label:'History',
      route:'comments'
    },
    {
      icon: 'analytics',
      label:'Analytics',
      route:'comments'
    },
    {
      icon: 'kitchen',
      label:'Ingredients',
      route:'ingredients'
    }
  ];
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  get sidenavWidth(): string {
    return this.collapsed ? '65px' : '250px';
  }

}
