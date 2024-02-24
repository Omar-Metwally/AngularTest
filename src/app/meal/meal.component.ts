import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MealsService } from '../api/services/meals.service';
import { MealsMealIdGet$Params } from '../api/fn/meals/meals-meal-id-get';
import { GetMealRequest } from '../api/models/get-meal-request';
import { Meal } from '../shared/models/meal/meal';
import { Option } from 'src/app/shared/models/address/option';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { environment } from 'src/environments/environment';
import { mealOption } from '../shared/models/meal/mealOption';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { AccountService } from '../account/account.service';
import { Cart } from '../api/models/cart';


@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent implements OnInit {

  @Input() mealID: string = ''
  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  styleOptions: Option[] = [];
  tagsOptions: Option[] = [];
  meal: Meal = {
    title: '',
    mealID: '',
    description: '',
    mealOptions: []
  }
  errorMessages: string[] = [];
  displayedImage: string = ''
  displayedPrice: number = 0
  currentMealOptionID: string = ''
  currentQuantity: number = 1
  currentMealOption: mealOption = {
    mealOptionID: '',
    MealSizeOption: 0,
    isAvailable: false,
    price: 0,
    availableQuantity: 0,
    saveQuantitySetting: false
  }

  constructor(private mealsService: MealsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService
  ) {
    this.categoryOptions.push({ id: '0', name: 'Main Dish' }, { id: '1', name: 'Side Dish' }, { id: '2', name: 'Appetizer' });
    this.spiceLevelOptions.push({ id: '0', name: 'Not Spicy' }, { id: '1', name: 'Mild' }, { id: '2', name: 'Medium' }, { id: '3', name: 'Hot' }, { id: '4', name: 'Very Hot' });
    this.tagsOptions.push({ id: '1', name: 'Healthy' }, { id: '3', name: 'Keto' }, { id: '6cea3c8b-ae0c-44a8-ad6d-4f2ff7f7e1df', name: 'Not Healthy' }, { id: '6cea3c8b-ae0c-44a8-ad6d-4f2ff7f7e1dc', name: 'Wrong ID' }, { id: '4', name: 'Very Hot' });
    this.styleOptions.push({ id: '0', name: 'Egyptian' }, { id: '1', name: 'Syrian' }, { id: '2', name: 'Lebanese' }, { id: '3', name: 'Western' }, { id: '4', name: 'Asian' }, { id: '5', name: 'Indian' })

    // const mealsMealIdGetParams: MealsMealIdGet$Params = {MealID: this.mealID}
    // let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
    //   panelClass: '',
    //   disableClose: true
    // });

    // mealsService.mealsMealIdGet(mealsMealIdGetParams).subscribe({
    //   next: (body) => {
    //     dialogRef.close()
    //     this.loadMeal(body)
    //   },
    //   error: error => {
    //     dialogRef.close()
    //     if (error.error.errors) {
    //       this.errorMessages = error.error.errors;
    //     } else {
    //       this.errorMessages.push(error.error);
    //     }
    //   }
    // })
  }

  ngOnInit(): void {
    const mealsMealIdGetParams: MealsMealIdGet$Params = { MealID: this.mealID }
    let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
      panelClass: '',
      disableClose: true
    });
    this.meal.mealOptions.fill(this.currentMealOption)
    console.log(this.meal)
    this.mealsService.mealsMealIdGet(mealsMealIdGetParams).subscribe({
      next: (body) => {
        dialogRef.close()
        this.loadMeal(body)
      },
      error: _ => {
        dialogRef.close()
        this.router.navigate(['/not-found']);
      }
    })
  }

  addToCart(mealOptionID: string) {
    const cartItem : Cart = { mealOptionID: mealOptionID, quantity: 1 }
    this.accountService.addItemToCart(cartItem)
  }

  changeDisplayedOption(mealOptionIndex: number) {
    this.currentMealOption = this.meal.mealOptions[mealOptionIndex] ?? this.meal.mealOptions[0]
    this.displayedImage = `${environment.appUrl}images/meal/FullScreen_${this.currentMealOption.mealOptionID}.jpg`
    this.displayedPrice = this.currentMealOption.price;
    this.currentQuantity = 1;
    this.currentMealOptionID = this.currentMealOption.mealOptionID;
  }

  loadMeal(getMealRequest: GetMealRequest) {
    let mealCategoryIndex = getMealRequest.mealCategory ?? 0
    let mealSpiceLevelIndex = getMealRequest.mealSpiceLevel ?? 0
    let mealStyleIndex = getMealRequest.mealStyle ?? 0

    this.meal = {
      title: getMealRequest.title ?? '',
      mealID: getMealRequest.mealID ?? '',
      mealCategory: this.categoryOptions.find(x => +x.id == (mealCategoryIndex)),
      mealSpiceLevel: this.spiceLevelOptions.find(x => +x.id == (mealSpiceLevelIndex)),
      mealStyle: this.styleOptions.find(x => +x.id == (mealStyleIndex)),
      description: getMealRequest.description ?? '',
      tagsID: this.tagsOptions.filter(x => getMealRequest.mealTags?.map(y => y.tagID).includes(x.id)),
      mealOptions: []
    }
    getMealRequest.getMealOptionsRequest?.forEach(mealOption => {
      this.meal.mealOptions.push({
        mealOptionID: mealOption.mealOptionID ?? '',
        MealSizeOption: mealOption.mealSizeOption ?? 0,
        isAvailable: mealOption.isAvailable ?? false,
        price: mealOption.price ?? 0,
        availableQuantity: 5,
        saveQuantitySetting: mealOption.saveQuantity ?? false
      })
    })
    this.displayedImage = `${environment.appUrl}images/meal/FullScreen_${this.meal.mealOptions[0].mealOptionID}.jpg`
    this.currentMealOption = this.meal.mealOptions[0]
    this.displayedPrice = this.meal.mealOptions[0].price
    this.currentMealOptionID = this.meal.mealOptions[0].mealOptionID
  }

  decrementQuantity() {
    if(this.currentQuantity > 1) {
      this.currentQuantity--
    }
  }
  incrementQuantity() {
    if(this.currentQuantity < this.currentMealOption.availableQuantity){
      this.currentQuantity++
    }
    else {
      this.snackBar.open(`you cannot add more than ${this.currentMealOption.availableQuantity}`, 'Close', {
        duration: 1500,
        panelClass: 'my-snackbar-background'
      });
    }
  }
}
