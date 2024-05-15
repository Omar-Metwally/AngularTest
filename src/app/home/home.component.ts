import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MealsService } from '../api/services';
import { MealCardComponent } from "../shared/meal-card/meal-card.component";
import { mealCard, mealCardOption } from '../shared/meal-card/meal-card';
import { MealsGet$Params } from '../api/fn/meals/meals-get';
import { Router } from '@angular/router';
import { GetCartItemRequest } from '../api/models';
import { MealChoicePopupComponent } from '../shared/meal-choice-popup/meal-choice-popup.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../account/account.service';



@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, SharedModule, NgbCarouselModule, MatIconModule, MealCardComponent]
})
export class HomeComponent {

  @ViewChild('mealCards', { read: ElementRef })
  public mealCards!: ElementRef<any>;
  mealsCard: mealCard[] = [];
  redirectToMeal = (event: Event, mealID: string) => {
    if ((event.target as HTMLElement).tagName === 'DIV') {
      this.router.navigate(['/meal', mealID]);
    }
  }
  redirectToMenu(){
    this.router.navigate(['/menu']);
  }
  mealGetRequest: MealsGet$Params = {
    PageNumber: 1,
    PageSize: 5,
    SortBy: 0,
    TagFilter: [],
    SizeFilter: [],
    StartPrice: 0,
    EndPrice: 5000,
  }
  errorMessages: any;

  constructor(private mealsService: MealsService,
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountService){
    this.mealsService.mealsGet(this.mealGetRequest).subscribe({
      next: (body) => {
        console.log(body)
        this.mealsCard = body.map(request => ({
          mealID: request.mealID || '',
          chiefID: request.chiefID || '',
          title: request.title || '',
          chiefName: request.chiefName || '',
          chiefImage: request.chiefImage || '',
          rating: request.rating || 0,
          mealCategory: request.mealCategory || 0,
          createdDate: request.createdDate || '',
          reviewsCount: 0,
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
        }));
      },
      error: error => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
      }
    });
  }

  redirectToChiefPage = (chiefID: string) => {
    this.router.navigate(['/chief-page', chiefID]);
  }

  addToCart = (mealOption: mealCardOption) => {
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
  
  // scrollRight(scrollable: CdkScrollable) {
  //   scrollable.scrollTo({ left: (scrollable.measureScrollOffset('left') + scrollable.getElementRef().nativeElement.offsetWidth) });
  // }

  // scrollLeft(scrollable: CdkScrollable) {
  //   scrollable.scrollTo({ left: (scrollable.measureScrollOffset('left') - scrollable.getElementRef().nativeElement.offsetWidth) });
  // }

  public scrollRight(): void {
    this.mealCards.nativeElement.scrollTo({ left: (this.mealCards.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.mealCards.nativeElement.scrollTo({ left: (this.mealCards.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

}
