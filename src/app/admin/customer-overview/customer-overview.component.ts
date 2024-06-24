import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnalyticsGetCustomerChartDataGet$Params } from 'src/app/api/fn/analytics/analytics-get-customer-chart-data-get';
import { GetCustomerAnalsis } from 'src/app/api/models';
import { AnalyticsService } from 'src/app/api/services';
import { ChartComponent } from 'src/app/shared/chart/chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedService } from 'src/app/shared/shared.service';

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
  constructor(private analyticsService: AnalyticsService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ){
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

  getCustomerChart(customerID: string){
    const request: AnalyticsGetCustomerChartDataGet$Params = {
      CustomerID: customerID
    }
    this.sharedService.showLoadingSpinner();
    this.analyticsService.analyticsGetCustomerChartDataGet(request).subscribe({
      next: (response) => {
        this.sharedService.hideLoadingSpinner();
        this.dialog.open(ChartComponent, {
          width: '100%',
          minWidth: 'min-content',
          minHeight: 'min-content',
          maxWidth: '1000px',
          maxHeight: '700px',
          enterAnimationDuration: '500ms',
          exitAnimationDuration: '250ms',
          data: {
            count: response.map(x => x.orderCount),
            date: response.map(x => x.date),
            colLabel: 'Orders Items Count',
            label: 'Customer Chart'
          }
        });
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner();
      }
    })
  }

  getTotalRevenue() {
    return this.customers.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0), 0);
  }

  getTotalProfit() {
    return this.customers.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0) * .2, 0);
  }

  getTotalCost() {
    return this.customers.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
  }

}
