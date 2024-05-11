import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetChiefAnalyticsRequest } from 'src/app/api/models';
import { AnalyticsService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';

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
  constructor(private analyticsService: AnalyticsService){
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

}
