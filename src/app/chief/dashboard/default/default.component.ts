import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetMealTableRequest } from 'src/app/api/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from "../../../filter.pipe";
import { MealsService } from 'src/app/api/services';

@Component({
    selector: 'app-default',
    standalone: true,
    templateUrl: './default.component.html',
    styleUrl: './default.component.css',
    imports: [SharedModule, CommonModule, FilterPipe]
})
export class DefaultComponent {
  searchText: any;

  meals: GetMealTableRequest[] = [];
  loading: boolean = true;
  constructor(private http: HttpClient,
    private mealsService: MealsService) { }

  ngOnInit() {
    this.loading = true;
    this.mealsService.mealsChiefMealsGet().subscribe({
      next: (response: GetMealTableRequest[])  => {
        console.log(response)
        this.meals = response
      },
      error: error => {

      }
    })

  }



  selectSize(meal: GetMealTableRequest, size: number) {
    meal.GetMealOptionsTable[0].mealSizeOption = size ?? 0;
    meal.GetMealOptionsTable[0].price = meal.GetMealOptionsTable[size].price;
    meal.GetMealOptionsTable[0].sold = meal.GetMealOptionsTable[size].sold;
  }




  isSizeAvailable(meal: GetMealTableRequest, sizeIndex: number): boolean {
    if (meal.GetMealOptionsTable.length > 0) {
      return meal.GetMealOptionsTable.some(option => option.mealSizeOption === sizeIndex && option.isAvailable);
    }
    return false;
  }

  isDropdownOpen: boolean = false;

  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    this.isDropdownOpen = false;

  }
}
