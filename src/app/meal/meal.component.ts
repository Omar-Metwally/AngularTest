import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MealsService } from '../api/services/meals.service';
import { MealsMealIdGet$Params } from '../api/fn/meals/meals-meal-id-get';
import { GetMealRequest } from '../api/models/get-meal-request';
import { Meal } from '../shared/models/meal/meal';
import { Option } from 'src/app/shared/models/address/option';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { environment } from 'src/environments/environment';
import { mealOption, mealSideDishOption } from '../shared/models/meal/mealOption';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { AccountService } from '../account/account.service';
import { GetCartItemRequest, MealCategory, MealSizeOption, MealSpiceLevel, MealStyle } from '../api/models';
import { MatRadioModule } from '@angular/material/radio';
import { mealCard, mealCardOption, mealSideDish } from '../shared/meal-card/meal-card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { MealsGetSimilarMealsGet$Params } from '../api/fn/meals/meals-get-similar-meals-get';
import { MealCardComponent } from "../shared/meal-card/meal-card.component";
import { MealChoicePopupComponent } from '../shared/meal-choice-popup/meal-choice-popup.component';

interface Meal1{
  mealID: string;
  chiefID: string;
  chiefOrderCount: number;
  chiefDescription: string;
  chiefName: string;
  reviewCount: number;
  title: string;
  description: string;
  rating: number;
  chiefImage: string;
  mealCategory?: MealCategory;
  mealSpiceLevel?: MealSpiceLevel;
  mealStyle?: MealStyle,
  tagsID?: Array<Option>;
  mealOptions: Array<MealOption>;
  mealReviews: Array<MealReview>;
}
interface MealReview{
  title: string;
  customerName: string;
  customerRating: number
  date: string
}
interface MealOption {
  mealOptionID: string
  image: string;
  MealSizeOption: MealSizeOption;
  price: number;
  availableQuantity: number;
  mealSideDishes?: Array<MealSideDish>;
  mealToppings?: Array<MealSideDish>;

}
interface MealSideDish{
  mealSideDishID: string;
  isFree: boolean;
  sideDishOptions: Array<MealSideDishOption>;
}
interface MealSideDishOption{
  sideDishOptionID: string;
  sideDishSizeOption: MealSizeOption;
  name: string;
  price: number;
}

@Component({
    selector: 'app-meal',
    standalone: true,
    templateUrl: './meal.component.html',
    styleUrl: './meal.component.css',
    imports: [CommonModule, SharedModule, MatRadioModule, MatDividerModule, FormsModule, NgbRating, MealCardComponent]
})
export class MealComponent implements OnInit {

  @Input() mealID: string = ''
  @ViewChild('mealCards', { read: ElementRef })
  public mealCards!: ElementRef<any>;  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  styleOptions: Option[] = [];
  tagsOptions: Option[] = [];
  mealsCard: mealCard[] = []
  meal: Meal1 = {
    chiefOrderCount: 0,
    reviewCount: 0,
    title: '',
    chiefID: '',
    mealID: '',
    chiefDescription: '',
    chiefName: '',
    description: '',
    rating: 0,
    mealOptions: [],
    mealReviews: [],
    chiefImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }
  errorMessages: string[] = [];
  displayedImage: string = ''
  displayedPrice: number = 0
  currentMealOptionID: string = ''
  currentQuantity: number = 1
  currentMealOption: MealOption = {
    mealOptionID: '',
    MealSizeOption: 0,
    price: 0,
    availableQuantity: 0,
    image: ''
  }
  mealSideDishes: mealSideDish[] = [];
  mealToppings: mealSideDish[] = [];
  selectedSideDishes: { [key: string]: [string, number ] } = {};


  constructor(private mealsService: MealsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute
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
    this.route.params.subscribe((params: Params) => {
      this.mealID = params['mealID'];
      this.getMeal()
    });
    
    // const mealsMealIdGetParams: MealsMealIdGet$Params = { MealID: this.mealID }
    // let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
    //   panelClass: '',
    //   disableClose: true
    // });
    // this.meal.mealOptions.fill(this.currentMealOption)
    // // console.log(this.meal)
    // this.mealsService.mealsMealIdGet(mealsMealIdGetParams).subscribe({
    //   next: (body) => {
    //     body.getMealOptionsRequest = body.getMealOptionsRequest?.sort((a, b) => (a.mealSizeOption ?? 0) - (b.mealSizeOption ?? 0)) || []
    //     dialogRef.close()
    //     this.loadMeal(body)
    //     const request: MealsGetSimilarMealsGet$Params = {
    //       MealID: body.mealID ?? ''
    //     }
    //     this.mealsService.mealsGetSimilarMealsGet(request).subscribe({
    //       next: response => this.mealsCard = [...this.mealsCard, ...response.map(request => ({
    //         mealID: request.mealID || '',
    //         chiefID: request.chiefID || '',
    //         title: request.title || '',
    //         chiefName: request.chiefName || '',
    //         chiefImage: request.chiefImage || '',
    //         mealCategory: request.mealCategory || 0,
    //         createdDate: request.createdDate || '',
    //         rating: request.rating || 0,
    //         reviewsCount: request.reviewCount || 0,
    //         mealCardOptions: request.getMealOptionsRequest?.map(option => ({
    //           mealOptionID: option.mealOptionID || '',
    //           mealOptionSize: option.mealSizeOption || 0,
    //           mealOptionImage: option.thumbnailImage || '',
    //           mealOptionPrice: option.price || 0,
    //           IsAvailable: option.isAvailable || false,
    //           mealSideDishes: option.getMealSideDishesRequest?.map(mealSideDish => ({
    //             mealSideDishID: mealSideDish.mealSideDishID || '',
    //             isFree: mealSideDish.isFree || false,
    //             isTopping: mealSideDish.isTopping || false,
    //             mealSideDishOptions: mealSideDish.getMealSideDishOptionsRequest?.map(sideDishOption => ({
    //               sideDishID: sideDishOption.sideDishID || '',
    //               sideDishSizeOption: sideDishOption.sideDishSizeOption || 0,
    //               name: sideDishOption.name || '',
    //               price: sideDishOption.price || 0,
    //               quantity: sideDishOption.quantity || 0
    //             })).sort((a, b) => a.sideDishSizeOption - b.sideDishSizeOption) || []
    //           })) || []
    
    //         })).sort((a, b) => a.mealOptionSize - b.mealOptionSize) || []
    //       }))],
    //       error: (error => {

    //       })
    //     });
    //   },
    //   error: _ => {
    //     dialogRef.close()
    //     this.router.navigate(['/not-found']);
    //   }
    // })
  }

  getMeal(){
    const mealsMealIdGetParams: MealsMealIdGet$Params = { MealID: this.mealID }
    let dialogRef: MatDialogRef<LoadingSpinnerComponent> = this.dialog.open(LoadingSpinnerComponent, {
      panelClass: '',
      disableClose: true
    });
    this.meal.mealOptions.fill(this.currentMealOption)
    // console.log(this.meal)
    this.mealsService.mealsMealIdGet(mealsMealIdGetParams).subscribe({
      next: (body) => {
        body.getMealOptionsRequest = body.getMealOptionsRequest?.sort((a, b) => (a.mealSizeOption ?? 0) - (b.mealSizeOption ?? 0)) || []
        dialogRef.close()
        this.loadMeal(body)
        const request: MealsGetSimilarMealsGet$Params = {
          MealID: body.mealID ?? ''
        }
        this.mealsService.mealsGetSimilarMealsGet(request).subscribe({
          next: response => {
            this.mealsCard = []
            this.mealsCard = [...this.mealsCard, ...response.map(request => ({
            mealID: request.mealID || '',
            chiefID: request.chiefID || '',
            title: request.title || '',
            chiefName: request.chiefName || '',
            chiefImage: request.chiefImage || '',
            mealCategory: request.mealCategory || 0,
            createdDate: request.createdDate || '',
            rating: request.rating || 0,
            reviewsCount: request.reviewCount || 0,
            mealCardOptions: request.getMealOptionsRequest?.map(option => ({
              mealOptionID: option.mealOptionID || '',
              mealOptionSize: option.mealSizeOption || 0,
              mealOptionImage: option.thumbnailImage || '',
              mealOptionPrice: option.price || 0,
              IsAvailable: option.isAvailable || false,
              mealSideDishes: option.getMealSideDishesRequest?.map(mealSideDish => ({
                mealSideDishID: mealSideDish.mealSideDishID || '',
                isFree: mealSideDish.isFree || false,
                isTopping: mealSideDish.isTopping || false,
                mealSideDishOptions: mealSideDish.getMealSideDishOptionsRequest?.map(sideDishOption => ({
                  sideDishID: sideDishOption.sideDishID || '',
                  sideDishSizeOption: sideDishOption.sideDishSizeOption || 0,
                  name: sideDishOption.name || '',
                  price: sideDishOption.price || 0,
                  quantity: sideDishOption.quantity || 0
                })).sort((a, b) => a.sideDishSizeOption - b.sideDishSizeOption) || []
              })) || []
    
            })).sort((a, b) => a.mealOptionSize - b.mealOptionSize) || []
          }))]},
          error: (error => {

          })
        });
      },
      error: _ => {
        dialogRef.close()
        this.router.navigate(['/not-found']);
      }
    })

  }

  addToCart(mealOptionID: string) {
    const cartItem : GetCartItemRequest = { mealOptionID: mealOptionID, quantity: 1 }
    this.accountService.addItemToCart(cartItem)
  }

  changeDisplayedOption(mealOptionIndex: number) {
    this.currentMealOption = this.meal.mealOptions[mealOptionIndex] ?? this.meal.mealOptions[0]
    this.displayedImage = this.currentMealOption.image
    this.displayedPrice = this.currentMealOption.price;
    this.currentQuantity = 1;
    this.currentMealOptionID = this.currentMealOption.mealOptionID;
  }

  // loadMeal(getMealRequest: GetMealRequest) {
  //   let mealCategoryIndex = getMealRequest.mealCategory ?? 0
  //   let mealSpiceLevelIndex = getMealRequest.mealSpiceLevel ?? 0
  //   let mealStyleIndex = getMealRequest.mealStyle ?? 0

  //   this.meal = {
  //     title: getMealRequest.title ?? '',
  //     mealID: getMealRequest.mealID ?? '',
  //     mealCategory: this.categoryOptions.find(x => +x.id == (mealCategoryIndex)),
  //     mealSpiceLevel: this.spiceLevelOptions.find(x => +x.id == (mealSpiceLevelIndex)),
  //     mealStyle: this.styleOptions.find(x => +x.id == (mealStyleIndex)),
  //     description: getMealRequest.description ?? '',
  //     //error
  //     tagsID: this.tagsOptions.filter(
  //       tagOption => getMealRequest.mealTags?.some(mealTag => mealTag.toFixed() === tagOption.id) // Check for matching IDs
  //   ),
  //     // tagsID: this.tagsOptions.filter(x => getMealRequest.mealTags?.map(y => y.tagID).includes(x.id)),
  //     mealOptions: []
  //   }
  //   getMealRequest.getMealOptionsRequest?.forEach(mealOption => {
  //     this.meal.mealOptions.push({
  //       mealOptionID: mealOption.mealOptionID ?? '',
  //       MealSizeOption: mealOption.mealSizeOption ?? 0,
  //       isAvailable: mealOption.isAvailable ?? false,
  //       price: mealOption.price ?? 0,
  //       availableQuantity: 5,
  //       saveQuantitySetting: mealOption.saveQuantity ?? false
  //     })
  //   })
  //   this.displayedImage = `${environment.appUrl}images/meal/FullScreen_${this.meal.mealOptions[0].mealOptionID}.jpg`
  //   this.currentMealOption = this.meal.mealOptions[0]
  //   this.displayedPrice = this.meal.mealOptions[0].price
  //   this.currentMealOptionID = this.meal.mealOptions[0].mealOptionID
  // }
  loadMeal(getMealRequest: GetMealRequest) {
    let mealCategoryIndex = getMealRequest.mealCategory ?? 0
    let mealSpiceLevelIndex = getMealRequest.mealSpiceLevel ?? 0
    let mealStyleIndex = getMealRequest.mealStyle ?? 0

    this.meal = {
      title: getMealRequest.title ?? '',
      mealID: getMealRequest.mealID ?? '',
      chiefID: getMealRequest.chiefID ?? '',
      chiefDescription: getMealRequest.chiefDescription ?? '',
      chiefOrderCount: getMealRequest.chiefOrderCount ?? 0,
      reviewCount: getMealRequest.reviewCount ?? 0,
      chiefName: getMealRequest.chiefName ?? '',
      rating: getMealRequest.rating ?? 0,
      mealCategory: getMealRequest.mealCategory,
      mealSpiceLevel: getMealRequest.mealSpiceLevel,
      mealStyle: getMealRequest.mealStyle,
      description: getMealRequest.description ?? '',
      chiefImage: getMealRequest.chiefImage ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      //error
      tagsID: this.tagsOptions.filter(
        tagOption => getMealRequest.mealTags?.some(mealTag => mealTag.toFixed() === tagOption.id) // Check for matching IDs
    ),
      // tagsID: this.tagsOptions.filter(x => getMealRequest.mealTags?.map(y => y.tagID).includes(x.id)),
      mealOptions: [],
      mealReviews: []
    }
    console.log(getMealRequest.getMealReviewsRequest)
    getMealRequest.getMealOptionsRequest?.forEach(mealOption => {
      let sideDishes: MealSideDish[] = [];
      let toppings: MealSideDish[] = [];
      mealOption.getMealSideDishesRequest?.forEach(sideDish => {
        if(sideDish.isTopping){
          toppings.push({
            mealSideDishID: sideDish.mealSideDishID ?? '',
            isFree: sideDish.isFree ?? false,
            sideDishOptions: sideDish.getMealSideDishOptionsRequest?.map(sideDishOption => {
              return {
                sideDishOptionID: sideDishOption.sideDishID ?? '',
                sideDishSizeOption: sideDishOption.sideDishSizeOption ?? 1,
                name: sideDishOption.name ?? '',
                price: sideDishOption.price ?? 0
              };
            }) || [],
          })
        }
        else{
          sideDishes.push({
            mealSideDishID: sideDish.mealSideDishID ?? '',
            isFree: sideDish.isFree ?? false,
            sideDishOptions: sideDish.getMealSideDishOptionsRequest?.map(sideDishOption => {
              return {
                sideDishOptionID: sideDishOption.sideDishID ?? '',
                sideDishSizeOption: sideDishOption.sideDishSizeOption ?? 1,
                name: sideDishOption.name ?? '',
                price: sideDishOption.price ?? 0
              };
            }) || [],
          })
        }
      })
      this.meal.mealOptions.push({
        mealOptionID: mealOption.mealOptionID ?? '',
        MealSizeOption: mealOption.mealSizeOption ?? 0,
        price: mealOption.price ?? 0,
        availableQuantity: mealOption.quantity ?? 5,
        image: mealOption.fullScreenImage ?? "",
        mealSideDishes: sideDishes,
        mealToppings: toppings
      })

    })
    getMealRequest.getMealReviewsRequest?.forEach(mealReview => {
      this.meal.mealReviews.push({
        title: mealReview.reviewText ?? '',
        customerName: mealReview.customerName ?? '',
        customerRating: mealReview.rating ?? 0,
        date: mealReview.reviewDate ?? ''
        
      })
    })

    this.displayedImage = this.meal.mealOptions[0].image
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
  trackByFunction(index: number, item: any) {
    return index;
  }
  redirectToMealReview = (mealID: string) => {
    this.router.navigate(['/meal-review', mealID]);
  }

  redirectToChiefPage = (chiefID: string) => {
    this.router.navigate(['/chief-page', chiefID]);
  }

  redirectToMeal = (event: Event, mealID: string) => {
    if ((event.target as HTMLElement).tagName === 'DIV') {
      this.router.navigate(['/meal', mealID]);
    }
  }

  addToCart2 = (mealOption: mealCardOption) => {
    if(mealOption.mealSideDishes.length > 0){
      const dialogRef = this.dialog.open(MealChoicePopupComponent, {
        width: 'min-content',
        height: 'min-content',
        minWidth: 'min-content',
        maxWidth: '100%',
        maxHeight: '80%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '250ms',
        data: {
          mealOptionID: mealOption.mealOptionID,
          mealOptionPrice: mealOption.mealOptionPrice,
          mealSideDishes: mealOption.mealSideDishes,
        }
      });
    }
    else{
      const cartItem: GetCartItemRequest = { mealOptionID: mealOption.mealOptionID, quantity: 1 }
      this.accountService.addItemToCart(cartItem)
    }
  }

  public scrollRight(): void {
    this.mealCards.nativeElement.scrollTo({ left: (this.mealCards.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.mealCards.nativeElement.scrollTo({ left: (this.mealCards.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }
  
}
