import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-order-placed-popup',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './order-placed-popup.component.html',
  styleUrl: './order-placed-popup.component.css'
})
export class OrderPlacedPopupComponent {

}
