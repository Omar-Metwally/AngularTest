import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetChiefAnalyticsRequest } from 'src/app/api/models';
import { AnalyticsService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyticsGetChiefChartDataGet$Params } from 'src/app/api/fn/analytics/analytics-get-chief-chart-data-get';
import { SharedService } from 'src/app/shared/shared.service';
import { ChartComponent } from 'src/app/shared/chart/chart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chiefs-overview',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './chiefs-overview.component.html',
  styleUrl: './chiefs-overview.component.css'
})
export class ChiefsOverviewComponent {
  chiefs: GetChiefAnalyticsRequest[] = [];
  totalRevenueSum = 0
  totalCostsSum = 0
  totalProfitSum = 0
  constructor(private analyticsService: AnalyticsService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ){
    this.analyticsService.analyticsGetChiefAnalyticsGet().subscribe({
      next: (response) => {
        console.log(response)
        this.chiefs = response;
        this.chiefs.sort((a, b) => (b.totalRevenue ?? 0) - (a.totalRevenue ?? 0));
        this.totalRevenueSum = this.chiefs.reduce((acc, chief) => acc + (chief.totalRevenue ?? 0), 0);
        this.totalCostsSum = this.chiefs.reduce((acc, chief) => acc + (chief.totalCost ?? 0), 0);
        this.totalProfitSum = (this.totalRevenueSum - this.totalCostsSum) * .2
      },
      error: (error) => {

      }
    })
  }

  getChiefChart(chiefID: string){
    const request: AnalyticsGetChiefChartDataGet$Params = {
      ChiefID: chiefID
    }
    this.sharedService.showLoadingSpinner();
    this.analyticsService.analyticsGetChiefChartDataGet(request).subscribe({
      next: (response) => {
        console.log(response)
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
            colLabel: 'Orders Done',
            label: 'Chief Chart'
          }
        });
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner();
      }
    })
  }

  getTotalRevenue() {
    return this.chiefs.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0), 0);
  }

  getTotalProfit() {
    return this.chiefs.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0) * .2, 0);
  }

  getTotalCost() {
      return this.chiefs.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
    }
}
