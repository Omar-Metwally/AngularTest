import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ChiefUpdateOrderItemStatusPatch$Params } from 'src/app/api/fn/chief/chief-update-order-item-status-patch';
import { OrderStatus } from 'src/app/api/models';
import { GetOrderItem } from 'src/app/api/models/get-order-item';
import { ChiefService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbNavModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  pendingConfirmOrderItems: GetOrderItem[] = []
  onFireOrderItems: GetOrderItem[] = []
  DeliveredOrderItems: GetOrderItem[] = []
  CancelledOrderItems: GetOrderItem[] = []

  constructor(private chiefService: ChiefService, private sharedService: SharedService){}

  tabChanged(event: any): void {
    this.selectedTab = event.target.id.split('-')[1];
    if ((this.selectedTab === 'Orders' && this.pendingConfirmOrderItems.length === 0) ||
      (this.selectedTab === 'Pending' && this.onFireOrderItems.length === 0) ||
      (this.selectedTab === 'ongoing' && this.DeliveredOrderItems.length === 0) ||
      (this.selectedTab === 'Cancelled' && this.CancelledOrderItems.length === 0)) {
    }
  }

  selectedTab: string = 'Orders';


  ngOnInit(): void {
    this.chiefService.chiefGetChiefOrdersGet().subscribe({
      next: (response) => {
        response.forEach(orderItem => {
          switch(orderItem.orderStatus){
            case 0:
              this.pendingConfirmOrderItems.push(orderItem);
              break;
            case 2:
              this.onFireOrderItems.push(orderItem);
              break;
            case 3:
              this.DeliveredOrderItems.push(orderItem);
              break;
            case 4:
              this.CancelledOrderItems.push(orderItem);
              break;
          }
        })        
      },
      error: (error) => {
        this.sharedService.showPopUp('danger',error[0])
      }
    })
  }
  changeOrderItemStatus(status: OrderStatus, orderItem: GetOrderItem){
    const request: ChiefUpdateOrderItemStatusPatch$Params ={
      OrderItemID: orderItem.orderItemID,
      OrderItemUpdate: status,
    }
    this.chiefService.chiefUpdateOrderItemStatusPatch(request).subscribe({
      next: () => {
        this.sharedService.showPopUp('Success', 'Order Item Updated');
        
        switch (orderItem.orderStatus) {
          case 0:
            this.removeFromOrderArray(this.pendingConfirmOrderItems, orderItem);
            break;
          case 2:
            this.removeFromOrderArray(this.onFireOrderItems, orderItem);
            break;
          case 3:
            this.removeFromOrderArray(this.DeliveredOrderItems, orderItem);
            break;
          case 4:
            this.removeFromOrderArray(this.CancelledOrderItems, orderItem);
            break;
        }

        orderItem.orderStatus = status
    
        switch (status) {
          case 0:
            this.pendingConfirmOrderItems.push(orderItem);
            break;
          case 2:
            this.onFireOrderItems.push(orderItem);
            break;
          case 3:
            this.DeliveredOrderItems.push(orderItem);
            break;
          case 4:
            this.CancelledOrderItems.push(orderItem);
            break;
        }
      },
      error: (error) => {
        this.sharedService.showPopUp('danger', error[0]);
      }
    });
  }

  private removeFromOrderArray(array: any[], orderItem: any): void {
    const index = array.findIndex(item => item === orderItem);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
