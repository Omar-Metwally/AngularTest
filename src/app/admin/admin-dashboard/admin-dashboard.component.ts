import { Component } from '@angular/core';
import { AdminSideNavComponent } from "../admin-side-nav/admin-side-nav.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [AdminSideNavComponent, RouterModule, CommonModule, SharedModule]
})
export class AdminDashboardComponent {

}
