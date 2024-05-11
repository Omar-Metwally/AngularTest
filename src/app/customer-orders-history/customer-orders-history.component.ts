import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from '../api/services';
import { GetOrderItem, GetOrderRequest } from '../api/models';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ReviewMealComponent } from '../review-meal/review-meal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';



@Component({
  selector: 'app-customer-orders-history',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './customer-orders-history.component.html',
  styleUrl: './customer-orders-history.component.css'
})
export class CustomerOrdersHistoryComponent {
  orders: GetOrderRequest[] = []
  @ViewChild('invoice') invoice!: ElementRef;

  constructor(private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog,
    public accountService: AccountService) {
    this.orderService.orderGetCustomerOrdersGet().subscribe({
      next: (response) => {
        this.orders = response
      },
      error: (error) => {

      }
    });
  }
  redirectToMeal(mealID: string) {
    this.router.navigate(['/meal', mealID]);
  }

  reviewMeal(meaID: string) {
    this.dialog.open(ReviewMealComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '20%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '250ms',
      data: {
        mealID: meaID
      }
    });


  }

  printHiddenContent(orderID: string) {
    const orderToPrint = document.getElementById(orderID);
    if (orderToPrint) {
      const printContents = orderToPrint.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    } else {
      console.error("Element with ID '" + orderID + "' not found.");
    }
  }
}
