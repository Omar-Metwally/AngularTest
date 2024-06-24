import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsGetCustomerChartDataGet$Params } from 'src/app/api/fn/analytics/analytics-get-customer-chart-data-get';
import { AnalyticsGetIngredientChartDataGet$Params } from 'src/app/api/fn/analytics/analytics-get-ingredient-chart-data-get';
import { AnalyticsGetMealChartDataGet$Params } from 'src/app/api/fn/analytics/analytics-get-meal-chart-data-get';
import { FoodIngredient, GetCustomerAnalsis, GetIngredientAnalysis, GetMealAnalysis } from 'src/app/api/models';
import { AnalyticsService, MealsService } from 'src/app/api/services';
import { ChartComponent } from 'src/app/shared/chart/chart.component';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MatTabsModule, MatProgressSpinnerModule, CommonModule, NgbNavModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  selectedTab: number = -1;
  dishCatalogueData: any[] = [];
  mealsData: any[] = [];
  customersData: any[] = [];

  meals: GetMealAnalysis[] = []
  customers: GetCustomerAnalsis[] = []
  ingredients: GetIngredientAnalysis[] = []

  isLoading: boolean = false;
  activeNav: number = 0;
  constructor(private analyticsService: AnalyticsService,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {
    this.tabChanged()
  }

  getEnumString(value: FoodIngredient): string {
    return FoodIngredient[value];
  }



  tabChanged(): void {
    this.activeNav
    if (this.activeNav === 0 && this.dishCatalogueData.length === 0) {
      this.analyticsService.analyticsGetMealAnalyticsGet().subscribe({
        next: (response) => {
          console.log(response)
          this.meals = response
        },
        error: (error) => {

        }
      })
    } else if (this.activeNav === 1 && this.mealsData.length === 0) {
      this.analyticsService.analyticsGetCustomerAnalyticsGet().subscribe({
        next: (response) => {
          console.log(response)
          this.customers = response
        },
        error: (error) => {

        }
      })
    } else if (this.activeNav === 2 && this.customersData.length === 0) {
      this.analyticsService.analyticsGetIngredientAnalyticsGet().subscribe({
        next: (response) => {
          console.log(response)
          this.ingredients = response
        },
        error: (error) => {

        }
      })
    }
    this.isLoading = false
  }

  getTotalRevenue() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0), 0);
  }

  getTotalProfit() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalRevenue ?? 0) - (meal.totalCost ?? 0) - (meal.totalRevenue ?? 0) * .2, 0);
  }

  getTotalCost() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
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

  getIngredientChart(ingredient: number){
    const request: AnalyticsGetIngredientChartDataGet$Params = {
      ingredient: ingredient
    }
    this.sharedService.showLoadingSpinner();
    this.analyticsService.analyticsGetIngredientChartDataGet(request).subscribe({
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
            colLabel: 'Used Amount (Grams)',
            label: 'Ingredient Chart'
          }
        });
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner();
      }
    })
  }

}

