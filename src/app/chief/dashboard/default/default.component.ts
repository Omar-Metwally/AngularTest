// //   import { sideDish } from 'src/app/shared/models/side-dish/side-dish';
// //   // import { GetMealOptionCartRequest } from './../../../api/models/get-meal-option-cart-request';
// //   // import { GetMealOptionTable } from './../../../api/models/get-meal-table-request';
// //   import { CommonModule } from '@angular/common';
// //   import { HttpClient } from '@angular/common/http';
// //   import { Component } from '@angular/core';
// //   import { GetMealOptionTable, GetMealTableRequest, MealCategory, MealSizeOption, MealSpiceLevel, MealStyle } from 'src/app/api/models';
// //   import { SharedModule } from 'src/app/shared/shared.module';
// //   import { FilterPipe } from "../../../filter.pipe";
// //   import { MealsService, SideDishService } from 'src/app/api/services';
// //   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// //   import { Router } from '@angular/router';
// //   import { MatDialog } from '@angular/material/dialog';
// //   import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
// //   import { mealOption } from 'src/app/shared/models/meal/mealOption';
// //   interface SideDish {
// //     thumbnailImage: string;
// //     name: string;
// //     selectedSize?: number;
// //     getSideDishOptions: {
// //       price: number;
// //       availableQuantity: number;
// //     }[];
// //     sideDishID: number;
// //   }
  
// //   interface MealTableRow {
// //     category?: MealCategory;
// //     getMealOptionsTable?: Array<GetMealOptionTable> | null;
// //     isAvailable?: boolean;
// //     mealID?: string;
// //     mealStyle?: MealStyle;
// //     rating?: number;
// //     spiceLevel?: MealSpiceLevel;
// //     title?: string | null;
// //     selectedSize?: MealSizeOption,
// //     totalSold?: number,
// //     price?: number,
// //     saveQuantity?: boolean,
// //     selectedImage?: string | null
// //   }

// //   @Component({
// //     selector: 'app-default',
// //     standalone: true,
// //     templateUrl: './default.component.html',
// //     styleUrl: './default.component.css',
// //     imports: [SharedModule, CommonModule, FilterPipe, ReactiveFormsModule, FormsModule]
// //   })
// //   export class DefaultComponent {
// //     searchText: any;
// //     meals: MealTableRow[] = [];
// //     loading: boolean = true;
// //     isLoading: boolean = false;
// //     activeButton: string = 'button1';


// //     sideDishes: any[] = [];

// //     constructor(private http: HttpClient,
// //       private mealsService: MealsService,
// //       public router: Router,
// //       private dialog: MatDialog,
// //       private sideDishService: SideDishService) { }


// //     ngOnInit() {

// //       this.mealsService.mealsChiefMealsGet().subscribe({
// //         next: (response: GetMealTableRequest[]) => {
// //           this.meals = response;


// //           this.calculateTotalSold();
// //           // Set default price for each meal
// //           this.meals.forEach(meal => {
// //             meal.selectedSize = 0; 
// //             this.selectSize(meal, 0); 
// //           });
// //         },
      
// //         error: error => {
// //           console.error(error);
// //           this.loading = false;
// //         }
        
// //       })


// //         this.sideDishService.sideDishGet().subscribe({
// //       next: (response: any[]) => {
// //         this.sideDishes = response;
// //         this.isLoading = false;
// //         // Set default price for each side dish
// //         this.sideDishes.forEach(dish => {
// //           dish.selectedSize = 0;
// //           this.selectSizeDish(dish, 0);
// //         });
// //       },
// //       error: error => {
// //         console.error(error);
// //         this.isLoading = false;
// //       }
// //     });

// //     }

// //     redirectToMeal = (meal: any) => {
// //       this.router.navigate(['/meal', meal.mealID]);
// //     }

// //     totalSold: number = 0;

// //     calculateTotalSold() {
// //       this.totalSold = this.meals.reduce((total, meal) => total + (meal.totalSold || 0), 0);
// //     }

// //     selectSize(meal: MealTableRow, size: number) {
// //       if (!meal.getMealOptionsTable || !meal.getMealOptionsTable[size]) {
// //         return;
// //       }

// //       meal.selectedSize = size;
// //       meal.price = meal.getMealOptionsTable[size].price;
// //       meal.saveQuantity = true;
// //       meal.selectedImage = meal.getMealOptionsTable[size].thumbnailImage;
// //     }


// //     isSizeAvailable(meal: GetMealTableRequest, sizeIndex: number): boolean {
// //       if (meal.getMealOptionsTable != null && meal.getMealOptionsTable.length > 0) {
// //         return meal.getMealOptionsTable.some(option => option.mealSizeOption === sizeIndex && option.isAvailable);
// //       }
// //       return false;
// //     }

// //     isDropdownOpen: boolean = true;

// //     showDropdown() {
// //       this.isDropdownOpen = true;
// //     }

// //     hideDropdown() {
// //       this.isDropdownOpen = false;

// //     }

// //     confirmMealDelete = () => {
// //       console.log('deleted')
// //     }
// //     openConfirmMealDeleteDialog(mealOption: any) {
// //       // this.mealOptionToDelete = mealOption; // Assign the meal option data

// //       const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
// //         width: 'min-content',
// //         height: 'min-content',
// //         minWidth: '20%',
// //         maxWidth: '100%',
// //         maxHeight: '80%',
// //         enterAnimationDuration: '500ms',
// //         exitAnimationDuration: '250ms',
// //         data: { // Pass data using `data` property
// //           title: 'Confirm Meal Deletion',
// //           content: `Are you sure you want to delete "${mealOption.title}"?`,
// //           mealOptionID: mealOption.id
// //         }
// //       });

// //       // Handle dialog close event (optional)
// //       dialogRef.afterClosed().subscribe(result => {
// //         if (result) {
// //           console.log('Meal option deleted:');
// //         }
// //       });
// //     }
// //     setActiveButton(buttonId: string) {
// //       this.activeButton = buttonId;
// //       this.isLoading = true;
// //     }


    
// //     // loadSideDishes() {
// //     //   this.isLoading = true;
// //     //   this.sideDishService.sideDishGet().subscribe({
// //     //     next: (response: any[]) => {
// //     //       this.sideDishes = response;
// //     //       this.isLoading = false;
// //     //     },
// //     //     error: error => {
// //     //       console.error(error);
// //     //       this.isLoading = false;
// //     //     }
// //     //   });
// //     // }

// //     redirectToSideDish(sideDish: any) {
// //       this.router.navigate(['/side-dish-add', sideDish.sideDishID]);
// //       // this.router.navigate(['/side-dish-add', sideDish.id]);
// //     }

// //     // selectSizeDish(sideDish: any, size: number) {
// //     //   // Your size selection logic
// //     //   sideDish.selectedSize = size;
// //     //   sideDish.price = sideDish.getSideDishOptions[size].price;

// //     // }

// //     // isSizeAvailableDish(sideDish: any, sizeIndex: number): boolean {
// //     //   if (sideDish.getSideDishOptions != null && sideDish.getSideDishOptions.length > 0) {
// //     //     return sideDish.getSideDishOptions.some((option: any) => option.mealSizeOption === sizeIndex && option.isAvailable);
// //     //   }
// //     //   return false;
// //     // }
    
// //     // selectSizeDish(sideDish: any, size: number) {
// //     //   // Your size selection logic
// //     //   sideDish.selectedSize = size;
// //     //   sideDish.price = sideDish.getSideDishOptions[size].price;
// //     // }

// //     // isSizeAvailableDish(sideDish: any, sizeIndex: number): boolean {
// //     //   if (sideDish.getSideDishOptions != null && sideDish.getSideDishOptions.length > 0) {
// //     //     return sideDish.getSideDishOptions.some((option: any) => option.sideDishSizeOption === sizeIndex && option.availableQuantity > 0);
// //     //   }
// //     //   return false;
// //     // }

    

// //     // openConfirmSideDishDeleteDialog(sideDish: any) {
// //     //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
// //     //     width: 'min-content',
// //     //     height: 'min-content',
// //     //     minWidth: '20%',
// //     //     maxWidth: '100%',
// //     //     maxHeight: '80%',
// //     //     enterAnimationDuration: '500ms',
// //     //     exitAnimationDuration: '250ms',
// //     //     data: {
// //     //       title: 'Confirm Side Dish Deletion',
// //     //       content: `Are you sure you want to delete "${sideDish.name}"?`,
// //     //       // sideDishID: sideDish.id
// //     //       sideDishID: sideDish.sideDishID

// //     //     }
// //     //   });

// //     //   dialogRef.afterClosed().subscribe(result => {
// //     //     if (result) {
// //     //       console.log('Side dish deleted:', sideDish);
// //     //       // Implement side dish deletion logic here
// //     //     }
// //     //   });
// //     // }


    
// // // Add a method to get the side dish price
// // // getSideDishPrice(dish: any, sizeIndex: number): string {
// // //   if (dish.getSideDishOptions != null && dish.getSideDishOptions.length > 0 && dish.getSideDishOptions[sizeIndex]) {
// // //     return `${dish.getSideDishOptions[sizeIndex].price} `;
// // //   }
// // //   return '';
// // // }
// // getSideDishPrice(dish: any, sizeIndex: number): string {
// //   if (dish.getSideDishOptions != null && dish.getSideDishOptions.length > 0 && dish.getSideDishOptions[sizeIndex]) {
// //     return `${dish.getSideDishOptions[sizeIndex].price} `;
// //   }
// //   return '';
// // }
// // // Remove the existing selectSizeDish and isSizeAvailableDish methods, and replace them with these methods:

// // selectSizeDish(dish: any, size: number) {
// //   dish.selectedSize = size;
// //   dish.price = dish.getSideDishOptions[size].price;
// // }

// // // isSizeAvailableDish(dish: any, sizeIndex: number): boolean {
// // //   if (dish.getSideDishOptions != null && dish.getSideDishOptions.length > 0 && dish.getSideDishOptions[sizeIndex]) {
// // //     return dish.getSideDishOptions[sizeIndex].availableQuantity > 0;
// // //   }
// // //   return false;
// // // }

// // isSizeAvailableDish(dish: SideDish, sizeIndex: number): boolean {
// //   if (
// //     dish.getSideDishOptions != null &&
// //     dish.getSideDishOptions.length > 0 &&
// //     dish.getSideDishOptions[sizeIndex]
// //   ) {
// //     return dish.getSideDishOptions[sizeIndex].availableQuantity > 0;
// //   }
// //   return false;
// // }

// // // Add the method to open the delete confirmation dialog for side dish
// // // openConfirmSideDishDeleteDialog(sideDish: any) {
// // //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
// // //     width: 'min-content',
// // //     height: 'min-content',
// // //     minWidth: '20%',
// // //     maxWidth: '100%',
// // //     maxHeight: '80%',
// // //     enterAnimationDuration: '500ms',
// // //     exitAnimationDuration: '250ms',
// // //     data: {
// // //       title: 'Confirm Side Dish Deletion',
// // //       content: `Are you sure you want to delete "${sideDish.name}"?`,
// // //       sideDishID: sideDish.sideDishID
// // //     }
// // //   });

// // //   dialogRef.afterClosed().subscribe(result => {
// // //     if (result) {
// // //       console.log('Side dish deleted:', sideDish);
// // //       // Implement side dish deletion logic here
// // //     }
// // //   });
// // // }
// // // openConfirmSideDishDeleteDialog(sideDish: SideDish) {
// // //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
// // //     width: 'min-content',
// // //     height: 'min-content',
// // //     minWidth: '20%',
// // //     maxWidth: '100%',
// // //     maxHeight: '80%',
// // //     enterAnimationDuration: '500ms',
// // //     exitAnimationDuration: '250ms',
// // //     data: {
// // //       title: 'Confirm Side Dish Deletion',
// // //       content: `Are you sure you want to delete "${sideDish.name}"?`,
// // //       sideDishID: sideDish.sideDishID
// // //     }
// // //   });

// // //   dialogRef.afterClosed().subscribe(result => {
// // //     if (result) {
// // //       console.log('Side dish deleted:', sideDish);
// // //       // Implement side dish deletion logic here
// // //     }
// // //   });
// // openConfirmSideDishDeleteDialog(sideDish: SideDish) {
// //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
// //     width: 'min-content',
// //     height: 'min-content',
// //     minWidth: '20%',
// //     maxWidth: '100%',
// //     maxHeight: '80%',
// //     enterAnimationDuration: '500ms',
// //     exitAnimationDuration: '250ms',
// //     data: {
// //       title: 'Confirm Side Dish Deletion',
// //       content: `Are you sure you want to delete "${sideDish.name}"?`,
// //       sideDishID: sideDish.sideDishID
// //     }
// //   });

// //   dialogRef.afterClosed().subscribe(result => {
// //     if (result) {
// //       console.log('Side dish deleted:', sideDish);
// //       // Implement side dish deletion logic here
// //     }
// //   });
// // }
// // }

// // // Add the property to hold selected size and price for side dish
// // // selectedSize: number = 0;
// // // selectedPrice: number = 0;



// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { GetMealOptionTable, GetMealTableRequest, MealCategory, MealSizeOption, MealSpiceLevel, MealStyle } from 'src/app/api/models';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { FilterPipe } from "../../../filter.pipe";
// import { MealsService, SideDishService } from 'src/app/api/services';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

// interface SideDish {
//   thumbnailImage: string;
//   name: string;
//   selectedSize?: number;
//   getSideDishOptions: {
//     price: number;
//     availableQuantity: number;
//   }[];
//   sideDishID: number;
// }

// interface MealTableRow {
//   category?: MealCategory;
//   getMealOptionsTable?: Array<GetMealOptionTable> | null;
//   isAvailable?: boolean;
//   mealID?: string;
//   mealStyle?: MealStyle;
//   rating?: number;
//   spiceLevel?: MealSpiceLevel;
//   title?: string | null;
//   selectedSize?: MealSizeOption,
//   totalSold?: number,
//   price?: number,
//   saveQuantity?: boolean,
//   selectedImage?: string | null
// }

// @Component({
//   selector: 'app-default',
//   standalone: true,
//   templateUrl: './default.component.html',
//   styleUrls: ['./default.component.css'],
//   imports: [SharedModule, CommonModule, FilterPipe, ReactiveFormsModule, FormsModule]
// })
// export class DefaultComponent {
//   searchText: any;
//   meals: MealTableRow[] = [];
//   loading: boolean = true;
//   isLoading: boolean = false;
//   activeButton: string = 'button1';

//   sideDishes: any[] = [];

//   constructor(private http: HttpClient,
//     private mealsService: MealsService,
//     public router: Router,
//     private dialog: MatDialog,
//     private sideDishService: SideDishService) { }

//   ngOnInit() {
//     this.mealsService.mealsChiefMealsGet().subscribe({
//       next: (response: GetMealTableRequest[]) => {
//         this.meals = response;
//         this.calculateTotalSold();
//         // Set default price for each meal
//         this.meals.forEach(meal => {
//           meal.selectedSize = 0;
//           this.selectSize(meal, 0);
//         });
//       },
//       error: error => {
//         console.error(error);
//         this.loading = false;
//       }
//     });

//     this.sideDishService.sideDishGet().subscribe({
//       next: (response: any[]) => {
//         this.sideDishes = response;
//         this.isLoading = false;
//         // Set default price for each side dish
//         this.sideDishes.forEach(dish => {
//           dish.selectedSize = 0;
//           this.selectSizeDish(dish, 0);
//         });
//       },
//       error: error => {
//         console.error(error);
//         this.isLoading = false;
//       }
//     });
//   }

//   redirectToMeal = (meal: any) => {
//     this.router.navigate(['/meal', meal.mealID]);
//   }

//   totalSold: number = 0;

//   calculateTotalSold() {
//     this.totalSold = this.meals.reduce((total, meal) => total + (meal.totalSold || 0), 0);
//   }

//   selectSize(meal: MealTableRow, size: number) {
//     if (!meal.getMealOptionsTable || !meal.getMealOptionsTable[size]) {
//       return;
//     }

//     meal.selectedSize = size;
//     meal.price = meal.getMealOptionsTable[size].price;
//     meal.saveQuantity = true;
//     meal.selectedImage = meal.getMealOptionsTable[size].thumbnailImage;
//   }

//   isSizeAvailable(meal: GetMealTableRequest, sizeIndex: number): boolean {
//     if (meal.getMealOptionsTable != null && meal.getMealOptionsTable.length > 0) {
//       return meal.getMealOptionsTable.some(option => option.mealSizeOption === sizeIndex && option.isAvailable);
//     }
//     return false;
//   }

//   isDropdownOpen: boolean = true;

//   showDropdown() {
//     this.isDropdownOpen = true;
//   }

//   hideDropdown() {
//     this.isDropdownOpen = false;

//   }

//   confirmMealDelete = () => {
//     console.log('deleted')
//   }

//   openConfirmMealDeleteDialog(mealOption: any) {
//     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//       width: 'min-content',
//       height: 'min-content',
//       minWidth: '20%',
//       maxWidth: '100%',
//       maxHeight: '80%',
//       enterAnimationDuration: '500ms',
//       exitAnimationDuration: '250ms',
//       data: { // Pass data using `data` property
//         title: 'Confirm Meal Deletion',
//         content: `Are you sure you want to delete "${mealOption.title}"?`,
//         mealOptionID: mealOption.id
//       }
//     });

//     // Handle dialog close event (optional)
//     dialogRef.afterClosed().subscribe((result: any) => {
//       if (result) {
//         console.log('Meal option deleted:');
//       }
//     });
//   }

//   setActiveButton(buttonId: string) {
//     this.activeButton = buttonId;
//     this.isLoading = true;
//   }

//   // Add a method to get the side dish price
//   getSideDishPrice(dish: any, sizeIndex: number): string {
//     if (dish.getSideDishOptions != null && dish.getSideDishOptions.length > 0 && dish.getSideDishOptions[sizeIndex]) {
//       return `${dish.getSideDishOptions[sizeIndex].price} `;
//     }
//     return '';
//   }

//   // Remove the existing selectSizeDish and isSizeAvailableDish methods, and replace them with these methods:
//   selectSizeDish(dish: any, size: number) {
//     dish.selectedSize = size;
//     dish.price = dish.getSideDishOptions[size].price;
//   }

//   isSizeAvailableDish(dish: SideDish, sizeIndex: number): boolean {
//     if (
//       dish.getSideDishOptions != null &&
//       dish.getSideDishOptions.length > 0 &&
//       dish.getSideDishOptions[sizeIndex]
//     ) {
//       return dish.getSideDishOptions[sizeIndex].availableQuantity > 0;
//     }
//     return false;
//   }

//   // Add the method to open the delete confirmation dialog for side dish
//   openConfirmSideDishDeleteDialog(sideDish: SideDish) {
//     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//       width: 'min-content',
//       height: 'min-content',
//       minWidth: '20%',
//       maxWidth: '100%',
//       maxHeight: '80%',
//       enterAnimationDuration: '500ms',
//       exitAnimationDuration: '250ms',
//       data: {
//         title: 'Confirm Side Dish Deletion',
//         content: `Are you sure you want to delete "${sideDish.name}"?`,
//         sideDishID: sideDish.sideDishID
//       }
//     });

//     dialogRef.afterClosed().subscribe((result: any) => {
//       if (result) {
//         console.log('Side dish deleted:', sideDish);
//         // Implement side dish deletion logic here
//       }
//     });
//   }
// }
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

  constructor(private http: HttpClient,
    private mealsService: MealsService,
    public router: Router,
    private dialog: MatDialog,
    private sideDishService: SideDishService) { }

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

  confirmMealDelete = () => {
    console.log('deleted')
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
      data: { // Pass data using `data` property
        title: 'Confirm Meal Deletion',
        content: `Are you sure you want to delete "${mealOption.title}"?`,
        mealOptionID: mealOption.id
      }
    });

    // Handle dialog close event (optional)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Meal option deleted:');
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
  openConfirmSideDishDeleteDialog(sideDish: SideDish) {
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
      if (result) {
        console.log('Side dish deleted:', sideDish);
        // Implement side dish deletion logic here
      }
    });
  }
}
