import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { AnalyticsService, MealsService } from 'src/app/api/services';
import { MealService } from 'src/app/meal/meal.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [MatTabsModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  selectedTab: number = -1;
  dishCatalogueData: any[] = [];
  mealsData: any[] = [];
  customersData: any[] = [];

  isLoading: boolean = false;

  constructor(private analyticsService: AnalyticsService) { }

  tabChanged(event: any): void {
    this.selectedTab = event.index;
    if (this.selectedTab === 0 && this.dishCatalogueData.length === 0) {
      this.analyticsService.analyticsGetMealAnalyticsGet().subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {

        }
      })
    } else if (this.selectedTab === 1 && this.mealsData.length === 0) {
      this.analyticsService.analyticsGetCustomerAnalsisGet().subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {

        }
      })
    } else if (this.selectedTab === 2 && this.customersData.length === 0) {
      this.analyticsService.analyticsGetIngredientAnalysisGet().subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {

        }
      })
    }
    this.isLoading = false
  }

  loadData(): void {
    this.isLoading = true;
    setTimeout(() => {
      if (this.selectedTab === 0) {
        this.dishCatalogueData = [
          {
            image: '...',
            name: 'Ahmed Ibrahim',
            profit: '2000EGP',
            cost: '500EGP',
            revenue: '1500EGP',
            ordersCount: 20
          },
          // Add more data as needed
        ];
      } else if (this.selectedTab === 1) {
        this.mealsData = [
          {
            image: '...',
            name: 'Ahmed Ibrahim',
            profit: '2000EGP',
            cost: '500EGP',
            revenue: '1500EGP',
            ordersCount: 20
          },
          // Add more data as needed
        ];
      } else if (this.selectedTab === 2) {
        this.customersData = [
          {
            image: '...',
            name: 'Ahmed Ibrahim',
            profit: '2000EGP',
            cost: '500EGP',
            revenue: '1500EGP',
            ordersCount: 20
          },
          // Add more data as needed
        ];
      }
      this.isLoading = false;
    }, 1000); // Simulating delay of 1 second
  }

}

