import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChiefService } from '../api/services';
import { ChiefGetChiefMealsGet$Params } from '../api/fn/chief/chief-get-chief-meals-get';
import { GetCartItemRequest, GetChiefMealsRequest, GetMealRequest } from '../api/models';
import { MealCardComponent } from "../shared/meal-card/meal-card.component";
import { mealCard, mealCardOption } from '../shared/meal-card/meal-card';
import { MealChoicePopupComponent } from '../shared/meal-choice-popup/meal-choice-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'app-chief-page',
    standalone: true,
    templateUrl: './chief-page.component.html',
    styleUrl: './chief-page.component.css',
    imports: [CommonModule, SharedModule, MealCardComponent]
})
export class ChiefPageComponent implements OnInit {

  @Input() chiefID: string = ''
  mealsCard: mealCard[] = [] 
  mostPopularMeals: mealCard[] = []
  newArrivalsMeals: mealCard[] = []
  mainDishMeals: mealCard[] = []
  sideDishMeals: mealCard[] = []
  dessertMeals: mealCard[] = []

  chief: GetChiefMealsRequest = {
  }

  dataLoaded = false;
  constructor(private chiefService:ChiefService,
    public dialog: MatDialog,
    private router: Router,
    private accountService: AccountService,
    private sharedService: SharedService,
    private renderer: Renderer2,
    private elementRef: ElementRef){

  }
  ngOnInit(): void {
    const request: ChiefGetChiefMealsGet$Params = {
      ChiefID: this.chiefID
    }
    this.sharedService.showLoadingSpinner()
    this.chiefService.chiefGetChiefMealsGet(request).subscribe({
      next: (response) => {
        this.mealsCard = response.meals?.map(request => ({
          mealID: request.mealID || '',
          chiefID: request.chiefID || '',
          title: request.title || '',
          chiefName: request.chiefName || '',
          chiefImage: request.chiefImage || '',
          rating: request.rating || 0,
          mealCategory: request.mealCategory || 0,
          createdDate: request.createdDate || '',
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
        })) ?? [];

        const processMeals = forkJoin([
          this.processMostPopularMeals(),
          this.processNewArrivalsMeals(),
          this.processMainDishMeals(),
          this.processSideDishMeals(),
          this.processDessertMeals()
        ]);
    
        // Wait for all meal categories to be processed
        processMeals.subscribe(() => {
          this.dataLoaded = true; // Set flag to true when all data is processed
        });
        this.chief = response;
        this.sharedService.hideLoadingSpinner()
      },
      error: (error) => {
        this.sharedService.hideLoadingSpinner()
        this.sharedService.showPopUp('danger','error, please refresh your page')
      }
    });

    // this.dataLoaded = true
  }

  redirectToMeal = (event: Event, mealID: string) => {
    if ((event.target as HTMLElement).tagName === 'DIV') {
      this.router.navigate(['/meal', mealID]);
    }
  }

  redirectToChiefPage = (chiefID: string) => {
    this.router.navigate(['/chief-page', chiefID]);
  }

  redirectToMealReview = (mealID: string) => {
    this.router.navigate(['/meal-review', mealID]);
  }

  addToCart = (mealOption: mealCardOption) => {
    if(mealOption.mealSideDishes.length > 0){
      const dialogRef = this.dialog.open(MealChoicePopupComponent, {
        width: 'min-content',
        height: 'min-content',
        minWidth: '20%',
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

  processMostPopularMeals() {
    return new Promise<void>((resolve) => {
      this.mostPopularMeals = this.mealsCard
        .filter(meal => meal.rating != null)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4) ?? [];
      resolve();
    });
  }
  
  processNewArrivalsMeals() {
    return new Promise<void>((resolve) => {
      this.newArrivalsMeals = this.mealsCard
        .filter(meal => meal.createdDate != null)
        .sort((a, b) => {
          const dateA = a.createdDate ? new Date(a.createdDate) : null;
          const dateB = b.createdDate ? new Date(b.createdDate) : null;
          return dateB ? (dateA ? dateB.getTime() - dateA.getTime() : 1) : -1;
        })
        .slice(0, 4) ?? [];
      resolve();
    });
  }

  processMainDishMeals() {
    return new Promise<void>((resolve) => {
      this.mainDishMeals = this.mealsCard
        .filter(meal => meal.mealCategory === 0)
        .slice(0, 4) ?? [];
      resolve();
    });
  }
  
  processSideDishMeals() {
    return new Promise<void>((resolve) => {
      this.sideDishMeals = this.mealsCard
        .filter(meal => meal.mealCategory === 1)
        .slice(0, 4) ?? [];
      resolve();
    });
  }
  
  processDessertMeals() {
    return new Promise<void>((resolve) => {
      this.dessertMeals = this.mealsCard
        .filter(meal => meal.mealCategory === 2)
        .slice(0, 4) ?? [];
      resolve();
    });
  }

  scrollTo(section: string) {
    console.log(section)
    const targetElement = this.elementRef.nativeElement.querySelector('#' + section);
    if (targetElement) {
      console.log(section)
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
