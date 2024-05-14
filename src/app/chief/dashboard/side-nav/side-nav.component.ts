import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AccountService } from 'src/app/account/account.service';

// export type MenuItem =  {
//   icon:string;
//   label:string;
//   route?:any
// }



// @Component({
//   selector: 'app-side-nav',
//   templateUrl: './side-nav.component.html',
//   styleUrl: './side-nav.component.css',
//   standalone: true,
//   imports: [RouterModule,MatButtonModule, MatMenuModule, CommonModule,SharedModule, CommonModule ,MatListModule ,
//     MatButtonModule,
//     MatSidenavModule,
//     MatSlideToggleModule,
//     MatListModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatButtonModule,
//     MatSidenavModule,
//     MatSlideToggleModule,
//     MatListModule]
// })
// export class SideNavComponent {
//   sideNavCollapsed = signal(false);

//   title = 'angular-project';
//   collapsed= signal(false);

//   sidenavWidth= computed(()=> this.collapsed()? '65px' :'250px');

//   // @Input() set collapsed(val:boolean){
//   //   this.sideNavCollapsed.set(val)
//   // }


//   menuItems= signal<MenuItem[]>([
//     {
//       icon: 'dashboard',
//       label:'Dashboard',
//       route:'dashboard'
      
//     },
//     {
//       icon: 'video_library',
//       label:'Content',
//       route:'content'
   
//     },
//      {
//       icon: 'analytics',
//       label:'Analytics',
//       route:'analytics'
//     },
//     {
//       icon: 'comments',
//       label:'Comments',
//       route:'comments'
//     }
//   ])

//   profilePicSize=computed(()=>this.sideNavCollapsed()? '32' : '100');




// }


export interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
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
    MatListModule]
})
export class SideNavComponent {
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
      route:'menu'
    },
    {
      icon: 'local_shipping',
      label:'Orders',
      route:'orders'
    },
    {
      icon: 'analytics',
      label:'Analytics',
      route:'analytics'
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

  logout(){
    this.accountService.logout();
  }

  get sidenavWidth(): string {
    return this.collapsed ? '65px' : '250px';
  }
}
