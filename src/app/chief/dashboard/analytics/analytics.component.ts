import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FoodIngredient, GetCustomerAnalsis, GetIngredientAnalysis, GetMealAnalysis } from 'src/app/api/models';
import { AnalyticsService, MealsService } from 'src/app/api/services';

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
  constructor(private analyticsService: AnalyticsService) { 
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
    return this.meals.reduce((acc, meal) => acc + ((meal.totalRevenue ?? 0) - (meal.totalCost ?? 0)) * .8, 0);
  }




getTotalCost() {
    return this.meals.reduce((acc, meal) => acc + (meal.totalCost ?? 0), 0);
  }




  // loadData(): void {
  //   this.isLoading = true;
  //   setTimeout(() => {
  //     if (this.selectedTab === 0) {
  //       this.dishCatalogueData = [
  //         {
  //           image: '...',
  //           name: 'Ahmed Ibrahim',
  //           profit: '2000EGP',
  //           cost: '500EGP',
  //           revenue: '1500EGP',
  //           ordersCount: 20
  //         },
  //         // Add more data as needed
  //       ];
  //     } else if (this.selectedTab === 1) {
  //       this.mealsData = [
  //         {
  //           image: '...',
  //           name: 'Ahmed Ibrahim',
  //           profit: '2000EGP',
  //           cost: '500EGP',
  //           revenue: '1500EGP',
  //           ordersCount: 20
  //         },
  //         // Add more data as needed
  //       ];
  //     } else if (this.selectedTab === 2) {
  //       this.customersData = [
  //         {
  //           image: '...',
  //           name: 'Ahmed Ibrahim',
  //           profit: '2000EGP',
  //           cost: '500EGP',
  //           revenue: '1500EGP',
  //           ordersCount: 20
  //         },
  //         // Add more data as needed
  //       ];
  //     }
  //     this.isLoading = false;
  //   }, 1000); // Simulating delay of 1 second
  // }

}

