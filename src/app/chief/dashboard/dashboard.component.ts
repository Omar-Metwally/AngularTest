import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideNavComponent } from "./side-nav/side-nav.component";
import { AddMealComponent } from 'src/app/meal/add-meal/add-meal.component';

export const ADMIN_ROUTES: Route[] = [
    {path: '', component: SideNavComponent},
    {path: 'add-meal', component: AddMealComponent},
  ];
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, SharedModule, RouterModule, SideNavComponent]
})
export class DashboardComponent {

}
