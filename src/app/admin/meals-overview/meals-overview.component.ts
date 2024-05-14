import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetMealAnalysis } from 'src/app/api/models';
import { AnalyticsService } from 'src/app/api/services';
import { SharedModule } from 'src/app/shared/shared.module';

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
  constructor(private analyticsService: AnalyticsService){
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
  

  getTotalRevenue() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0), 0);
  }

  getTotalProfit() {
    return this.meals.reduce((acc, meal) => acc + ((meal.totalRevenue ?? 0) - (meal.totalCost ?? 0)) * .8, 0);
  }




getTotalCost() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
  }
}
