import { sideDish } from 'src/app/shared/models/side-dish/side-dish';
// import { GetMealOptionCartRequest } from './../../../api/models/get-meal-option-cart-request';
// import { GetMealOptionTable } from './../../../api/models/get-meal-table-request';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetMealOptionTable, GetMealTableRequest, MealCategory, MealSizeOption, MealSpiceLevel, MealStyle } from 'src/app/api/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from "../../../filter.pipe";
import { MealsService } from 'src/app/api/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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
  styleUrl: './default.component.css',
  imports: [SharedModule, CommonModule, FilterPipe, ReactiveFormsModule, FormsModule]
})
export class DefaultComponent {
  searchText: any;
  meals: MealTableRow[] = [];
  loading: boolean = true;
  isLoading: boolean = false;
  activeButton: string = 'button1';

  constructor(private http: HttpClient,
    private mealsService: MealsService,
    public router: Router,
    private dialog: MatDialog) { }


  ngOnInit() {

    this.mealsService.mealsChiefMealsGet().subscribe({
      next: (response: GetMealTableRequest[]) => {
        this.meals = response;
        // console.log(this.meals)
        // console.log(response);

        this.calculateTotalSold();
        // Set default price for each meal
        this.meals.forEach(meal => {
          meal.selectedSize = 0; // Set the selected size to the default size (0 for the first option)
          this.selectSize(meal, 0); // Set the price and other relevant data based on the default size
        });
      },
      error: error => {
        console.error(error);
        this.loading = false;
      }
    })
  }

  redirectToMeal = (meal: any) => {
    console.log(meal)
    this.router.navigate(['/meal', meal.mealID]);
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

  confirmMealDelete = () => {
    console.log('deleted')
  }
  openConfirmMealDeleteDialog(mealOption: any) {
    // this.mealOptionToDelete = mealOption; // Assign the meal option data

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'min-content',
      height: 'min-content',
      minWidth: '20%',
      maxWidth: '100%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '250ms',
      data: { // Pass data using `data` property
        title: 'Confirm Meal Deletion',
        content: `Are you sure you want to delete "${mealOption.title}"?`,
        mealOptionID: mealOption.id
      }
    });

    // Handle dialog close event (optional)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Meal option deleted:');
      }
    });
  }
  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
    this.isLoading = true;
  }
}