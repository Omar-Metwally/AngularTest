import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-order-placed-popup',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './order-placed-popup.component.html',
  styleUrl: './order-placed-popup.component.css'
})
export class OrderPlacedPopupComponent {
  constructor(private router: Router,
    public dialogRef: MatDialogRef<OrderPlacedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string){}

  redirectToOrdersPage(){
    this.router.navigate(['/order-history']);
    this.dialogRef.close();
  }

  redirectToMenuPage(){
    this.router.navigate(['/menu']);
    this.dialogRef.close();
  }
}
