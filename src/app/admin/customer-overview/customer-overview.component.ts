import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetCustomerAnalsis } from 'src/app/api/models';
import { AnalyticsService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.css'
})
export class CustomerOverviewComponent {
  customers: GetCustomerAnalsis[] = []
  totalRevenueSum = 0
  totalCostsSum = 0
  totalProfitSum = 0
  constructor(private analyticsService: AnalyticsService){
    this.analyticsService.analyticsGetCustomerAnalyticsGet().subscribe({
      next: (response) => {
        this.customers = response
        this.customers.sort((a, b) => (b.totalRevenue ?? 0) - (a.totalRevenue ?? 0));
        this.totalRevenueSum = this.customers.reduce((acc, customer) => acc + (customer.totalRevenue ?? 0), 0);
        this.totalCostsSum = this.customers.reduce((acc, customer) => acc + (customer.totalCost ?? 0), 0);
        this.totalProfitSum = (this.totalRevenueSum - this.totalCostsSum) * .2
      },
      error: (error) => {

      }
    })
  }
}
