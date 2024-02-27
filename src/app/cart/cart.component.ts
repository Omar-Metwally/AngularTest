import { Component, OnInit } from '@angular/core';
import { Cart, DiscountCalculateRequest, GetMealOptionCartRequest, MealData } from '../api/models';
import { AccountService } from '../account/account.service';
import { MealsService, PromoCodeService } from '../api/services';
import { MealsMealOptionCartPost$Params } from '../api/fn/meals/meals-meal-option-cart-post';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PromoCodeDiscountCalculatePost$Params } from '../api/fn/promo-code/promo-code-discount-calculate-post';
import { NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, SharedModule, NgbTimepickerModule ,FormsModule ,MatStepperModule, MatIcon],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  constructor(private accountService: AccountService,
    private mealService: MealsService,
    private promoCodeService: PromoCodeService){

  }

  cartItems: Cart[] = []
  mealOptions: GetMealOptionCartRequest[] = [];
  discount = 0;
  total = 0
  promoCodeInput: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
	hourStep = 1;
	minuteStep = 15;
	secondStep = 30;


  async ngOnInit() {
    this.cartItems = await this.accountService.updateCartItemsFromAPI() ?? []
    if(this.cartItems){
      const mealOptionIDs: MealsMealOptionCartPost$Params = {body: this.cartItems.map(x => x.mealOptionID)}
      this.mealService.mealsMealOptionCartPost(mealOptionIDs).subscribe({
        next: (response) => {
          this.mealOptions = response
          this.mealOptions.forEach(mealOption => {
            mealOption.quantity = this.cartItems.find(x => x.mealOptionID === mealOption.mealOptionID)?.quantity ?? 0
            mealOption.timeOfDelivery = this.cartItems.find(x => x.mealOptionID === mealOption.mealOptionID)?.timeOfDelivery ?? "00:00:00"
          });
          console.log(this.mealOptions)
          this.total = this.calculateTotal()
        },
        error: error => {

        }
      })
    }
  }

  calculateTotal() : number{
    this.mealOptions.forEach(mealOption => {
      this.total += mealOption.price * (mealOption.quantity ?? 0)
    });
    return this.total
  }

  applyPromoCode(){
    if(this.promoCodeInput.value){

      const mealsData: MealData[] = []

      console.log(this.cartItems)


      for (const cartItem of this.cartItems) {
        const mealData: MealData = {
          mealOptionIDs: cartItem.mealOptionID,
          quantities: cartItem.quantity,
        };
        mealsData.push(mealData);
      }

      const data: DiscountCalculateRequest = {
        promoCodeID: this.promoCodeInput.value,
        mealData: mealsData
      }
      const request: PromoCodeDiscountCalculatePost$Params = {body: data} ;

      console.log(request)
      this.promoCodeService.promoCodeDiscountCalculatePost(request).subscribe({
        next: (response) => {
          this.discount = response as number
        },
        error: error => {

        }
      })
    }
    else{
    }
  }
}
