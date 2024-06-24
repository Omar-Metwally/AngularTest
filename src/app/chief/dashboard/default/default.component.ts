
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetMealOptionTable, GetMealTableRequest, MealCategory, MealSizeOption, MealSpiceLevel, MealStyle } from 'src/app/api/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from "../../../filter.pipe";
import { MealsService, SideDishService } from 'src/app/api/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MealsDelete$Params } from 'src/app/api/fn/meals/meals-delete';
import { SharedService } from 'src/app/shared/shared.service';
import { SideDishDelete$Params } from 'src/app/api/fn/side-dish/side-dish-delete';

interface SideDish {
  thumbnailImage: string;
  name: string;
  selectedSize?: number;
  getSideDishOptions: {
    price: number;
    availableQuantity: number;
  }[];
  sideDishID: number;
}

interface MealTableRow {
  category?: MealCategory;
  getMealOptionsTable?: Array<GetMealOptionTable> | null;
  isAvailable?: boolean;
  mealID?: string;
  mealStyle?: MealStyle;
  rating?: number;
  spiceLevel?: MealSpiceLevel;
  title?: string | null;
  selectedSize?: MealSizeOption,
  totalSold?: number,
  price?: number,
  saveQuantity?: boolean,
  selectedImage?: string | null
}

@Component({
  selector: 'app-default',
  standalone: true,
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  imports: [SharedModule, CommonModule, FilterPipe, ReactiveFormsModule, FormsModule]
})
export class DefaultComponent {
  searchText: any;
  meals: MealTableRow[] = [];
  loading: boolean = true;
  isLoading: boolean = false;
  activeButton: string = 'button1';

  sideDishes: any[] = [];

  constructor(
    private mealsService: MealsService,
    public router: Router,
    private dialog: MatDialog,
    private sideDishService: SideDishService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.mealsService.mealsChiefMealsGet().subscribe({
      next: (response: GetMealTableRequest[]) => {
        this.meals = response;
        this.calculateTotalSold();
        // Set default price for each meal
        this.meals.forEach(meal => {
          meal.selectedSize = 0;
          this.selectSize(meal, 0);
        });
      },
      error: error => {
        console.error(error);
        this.loading = false;
      }
    });

    this.sideDishService.sideDishGet().subscribe({
      next: (response: any[]) => {
        this.sideDishes = response;
        this.isLoading = false;
        // Set default price for each side dish
        this.sideDishes.forEach(dish => {
          dish.selectedSize = 0;
          this.selectSizeDish(dish, 0);
        });
      },
      error: error => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  redirectToMeal = (meal: any) => {
    this.router.navigate(['/meal', meal.mealID]);
  }

  redirectToSideDish(sideDish: any) {
    this.router.navigate(['/side-dish-add', sideDish.sideDishID]);
  }

  totalSold: number = 0;

  calculateTotalSold() {
    this.totalSold = this.meals.reduce((total, meal) => total + (meal.totalSold || 0), 0);
  }

  selectSize(meal: MealTableRow, size: number) {
    if (!meal.getMealOptionsTable || !meal.getMealOptionsTable[size]) {
      return;
    }

    meal.selectedSize = size;
    meal.price = meal.getMealOptionsTable[size].price;
    meal.saveQuantity = true;
    meal.selectedImage = meal.getMealOptionsTable[size].thumbnailImage;
  }

  isSizeAvailable(meal: GetMealTableRequest, sizeIndex: number): boolean {
    if (meal.getMealOptionsTable != null && meal.getMealOptionsTable.length > 0) {
      return meal.getMealOptionsTable.some(option => option.mealSizeOption === sizeIndex && option.isAvailable);
    }
    return false;
  }

  isDropdownOpen: boolean = true;

  showDropdown() {
    this.isDropdownOpen = true;
  }

  hideDropdown() {
    this.isDropdownOpen = false;

  }

  openConfirmMealDeleteDialog(mealOption: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '20%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '250ms',
      data: {
        title: 'Confirm Meal Deletion',
        content: `Are you sure you want to delete "${mealOption.title}"?`,
        mealOptionID: mealOption.id
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const request: MealsDelete$Params = { MealID: mealOption.mealID }
        this.sharedService.showLoadingSpinner()
        this.mealsService.mealsDelete(request).subscribe({
          next: (response) => {
            this.sharedService.hideLoadingSpinner()
            this.sharedService.showPopUp('success', 'Meal Deleted')
            this.meals = this.meals.filter(item => item !== mealOption);
          },
          error: (error) => {
            this.sharedService.hideLoadingSpinner()
            this.sharedService.showPopUp('danger', 'error please try again later')
          }
        });
      }
    });
  }

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
    this.isLoading = true;
  }

  // Add a method to get the side dish price
  // getSideDishPrice(dish: any, sizeIndex: number): string {
  //   if (dish.getSideDishOptions != null && dish.getSideDishOptions.length > 0 && dish.getSideDishOptions[sizeIndex]) {
  //     return `${dish.getSideDishOptions[sizeIndex].price} `;
  //   }
  //   return '';
  // }


  // Remove the existing selectSizeDish and isSizeAvailableDish methods, and replace them with these methods:
  selectSizeDish(dish: any, size: number) {
    dish.selectedSize = size;
    dish.price = dish.getSideDishOptions[size].price;
  }

  isSizeAvailableDish(dish: SideDish, sizeIndex: number): boolean {
    if (
      dish.getSideDishOptions != null &&
      dish.getSideDishOptions.length > 0 &&
      dish.getSideDishOptions[sizeIndex]
    ) {
      return dish.getSideDishOptions[sizeIndex].availableQuantity > 0;
    }
    return false;
  }
  getSideDishPrice(dish: any, selectedSize: number) {
    if (dish.getSideDishOptions && dish.getSideDishOptions[selectedSize]) {
      return dish.getSideDishOptions[selectedSize].price;
    }
    // Return the price of the first index when the selected size is not available
    if (dish.getSideDishOptions && dish.getSideDishOptions.length > 0) {
      return dish.getSideDishOptions[0].price;
    }
    return "";
  }
  // Add the method to open the delete confirmation dialog for side dish
  openConfirmSideDishDeleteDialog(sideDish: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '20%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '250ms',
      data: {
        title: 'Confirm Side Dish Deletion',
        content: `Are you sure you want to delete "${sideDish.name}"?`,
        sideDishID: sideDish.sideDishID
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result)
      if (result) {
        const request: SideDishDelete$Params = { SideDishID: sideDish.sideDishID }
        this.sharedService.showLoadingSpinner()
        this.sideDishService.sideDishDelete(request).subscribe({
          next: (response) => {
            this.sharedService.hideLoadingSpinner()
            this.sharedService.showPopUp('success', 'SideDish Deleted')
            this.sideDishes = this.sideDishes.filter(item => item !== sideDish);
          },
          error: (error) => {
            this.sharedService.hideLoadingSpinner()
            this.sharedService.showPopUp('danger', 'error please try again later')
          }
        });
      }
    });
  }

  getCategory(index: number): string {
    if (index == 0)
      return 'Main'
    else if (index == 1)
      return 'Side'
    else if (index == 2)
      return 'Appetizer'
    return 'unknown'
  }

  getSpiceLevel(index: number): string {
    if (index == 0)
      return 'Not Spicy'
    else if (index == 1)
      return 'Mild'
    else if (index == 2)
      return 'Medium'
    else if (index == 3)
      return 'Hot'
    else if (index == 4)
      return 'Very Hot'
    return 'unknown'
  }
}
