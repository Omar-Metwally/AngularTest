import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MealsTableComponent } from "./meals-table/meals-table.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, SharedModule, MealsTableComponent]
})
export class ProfileComponent {

}
