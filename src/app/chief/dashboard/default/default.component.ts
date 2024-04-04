import { sideDish } from 'src/app/shared/models/side-dish/side-dish';
import { GetMealOptionCartRequest } from './../../../api/models/get-meal-option-cart-request';
import { GetMealOptionTable } from './../../../api/models/get-meal-table-request';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetMealTableRequest } from 'src/app/api/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterPipe } from "../../../filter.pipe";
import { MealsService } from 'src/app/api/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-default',
    standalone: true,
    templateUrl: './default.component.html',
    styleUrl: './default.component.css',
    imports: [SharedModule, CommonModule, FilterPipe , ReactiveFormsModule ,FormsModule  ]
})
export class DefaultComponent {
  searchText: any;

       meals: GetMealTableRequest[] = [];

  loading: boolean = true;
  constructor(private http: HttpClient,
    private mealsService: MealsService) { }

  
  ngOnInit() {

   
    
    this.mealsService.mealsChiefMealsGet().subscribe({
      next: (response: GetMealTableRequest[])  => {
        this.meals = response;
        console.log(this.meals)
        console.log(response);
        
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

  totalSold: number = 0;

  calculateTotalSold() {
    this.totalSold = this.meals.reduce((total, meal) => total + (meal.totalSold || 0), 0);
  }

//   selectSize(meal: GetMealTableRequest, size: number) {
//     meal.selectedSize = size;
//     meal.price = meal.getMealOptionsTable[size].price;
//     meal.selectedImage = meal.getMealOptionsTable[size].thumbnailImage;
//     // Update other relevant data as needed
// }

selectSize(meal: GetMealTableRequest, size: number) {
  meal.selectedSize = size;
  meal.price = meal.getMealOptionsTable[size].price;
  meal.saveQuantity = meal.getMealOptionsTable[size].saveQuantity;
  meal.selectedImage = meal.getMealOptionsTable[size].thumbnailImage;

  // Update other relevant data as needed

  // Iterate through meal.getMealOptionsTable to update isAvailable property
//   meal.getMealOptionsTable.forEach(option => {
//     option.isAvailable = option.mealSizeOption === size;
// });
}


  isSizeAvailable(meal: GetMealTableRequest, sizeIndex: number): boolean {
    if (meal.getMealOptionsTable.length > 0) {
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
}



    // ngOnInit() {
    //   this.loading = true;
  
    //   this.http.get<GetMealTableRequest[]>('https://www.bl-hana.somee.com/meals/ChiefMeals')
    //     .subscribe(data => {
    //       this.meals = data;
    //     console.log(this.meals);
    //     this.loading = false; // Set loading to false once data is loaded
  
          
    //     });
    //   }

  //           //  very important  
  // selectSize(meal: GetMealTableRequest, size: number) {
  //   // Assuming meal.getMealOptionsRequest[size] contains the selected size option
  //     // meal.price = meal.getMealOptionsRequest[0].price;
  //   // this.come=true;
  //   meal.selectedSize = size;
  //   // meal.price = meal.GetMealOptionsTable[size].price;
  //   meal.price = meal.GetMealOptionsTable[size].price;
    
  //   meal.saveQuantity = meal.GetMealOptionsTable[size].saveQuantity;
  //   // meal.selectedImage = meal.GetMealOptionsTable[size].thumbnailImage
  //   meal.selectedImage = meal.GetMealOptionsTable[size].thumbnailImage;


  //      // Update other relevant data as needed
  //     //  meal.mealCategory = this.getMealCategory(meal); // Example: Update meal category
  //     //  meal.mealSpiceLevel = this.getMealSpiceLevel(meal); // Example: Update meal spice level
  //     //  meal.totalSold = this.getTotalSold(meal); // Example: Update total sold
  // }

  


  // selectSize(meal: any, size: number) {
  //   // Assuming meal.getMealOptionsRequest[size] contains the selected size option
  //     // meal.price = meal.getMealOptionsRequest[0].price;
  //   // this.come=true;
  //   meal.selectedSize = size;
  //   meal.price = meal.GetMealOptionsTable[size].price;
  //   // meal.saveQuantity = meal.GetMealOptionsTable[size].saveQuantity;
  //   // meal.selectedImage = meal.GetMealOptionsTable[size].thumbnailImage

  //      // Update other relevant data as needed
  //     //  meal.mealCategory = this.getMealCategory(meal); // Example: Update meal category
  //     //  meal.mealSpiceLevel = this.getMealSpiceLevel(meal); // Example: Update meal spice level
  //     //  meal.totalSold = this.getTotalSold(meal); // Example: Update total sold
  // }







  // selectSize(meal: any, size: number) {
  //   // Assuming meal.getMealOptionsRequest[size] contains the selected size option
  //     // meal.price = meal.getMealOptionsRequest[0].price;
  //   // this.come=true;
  //   meal.selectedSize = size;
  //   meal.price = meal.getMealOptionsRequest[size].price;
  //   meal.availableQuantity = meal.getMealOptionsRequest[size].saveQuantity;

  //      // Update other relevant data as needed
  //     //  meal.mealCategory = this.getMealCategory(meal); // Example: Update meal category
  //     //  meal.mealSpiceLevel = this.getMealSpiceLevel(meal); // Example: Update meal spice level
  //     //  meal.totalSold = this.getTotalSold(meal); // Example: Update total sold
  // }


  // selectSize(meal: GetMealTableRequest, size: number) {
  //   meal.GetMealOptionsTable[0].mealSizeOption = size ?? 0;
  //   meal.GetMealOptionsTable[0].price = meal.GetMealOptionsTable[size].price;
  //   meal.GetMealOptionsTable[0].sold = meal.GetMealOptionsTable[size].sold;
  // }


