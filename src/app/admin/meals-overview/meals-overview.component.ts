import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnalyticsGetMealChartDataGet$Params } from 'src/app/api/fn/analytics/analytics-get-meal-chart-data-get';
import { GetMealAnalysis } from 'src/app/api/models';
import { AnalyticsService } from 'src/app/api/services';
import { ChartComponent } from 'src/app/shared/chart/chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-meals-overview',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './meals-overview.component.html',
  styleUrl: './meals-overview.component.css'
})
export class MealsOverviewComponent {
  meals: GetMealAnalysis[] = []
  totalRevenueSum = 0
  totalCostsSum = 0
  totalProfitSum = 0
  constructor(private analyticsService: AnalyticsService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ){
    this.analyticsService.analyticsGetMealAnalyticsGet().subscribe({
      next: (response) => {
        this.meals = response
        this.meals.sort((a, b) => (b.totalRevenue ?? 0) - (a.totalRevenue ?? 0));
        this.totalRevenueSum = this.meals.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0), 0);
        this.totalCostsSum = this.meals.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
        this.totalProfitSum = (this.totalRevenueSum - this.totalCostsSum) * .2
      },
      error: (error) => {

      }
    })
  }

  getMealChart(mealOptionID: string){
    const request: AnalyticsGetMealChartDataGet$Params = {
      MealOptionID: mealOptionID
    }
    this.sharedService.showLoadingSpinner();
    this.analyticsService.analyticsGetMealChartDataGet(request).subscribe({
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
            colLabel: 'Orders Count',
            label: 'Meal Chart'
          }
        });
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner();
      }
    })
  }
  

  getTotalRevenue() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0), 0);
  }

  getTotalProfit() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0) * .2, 0);
  }


getTotalCost() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
  }
}
