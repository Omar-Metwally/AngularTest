import { Component, OnInit } from '@angular/core';
import { Cart, CreateOrderRequest, DiscountCalculateRequest, GetMealOptionCartRequest, MealData } from '../api/models';
import { AccountService } from '../account/account.service';
import { MealsService, OrderService, PromoCodeService } from '../api/services';
import { MealsMealOptionCartPost$Params } from '../api/fn/meals/meals-meal-option-cart-post';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PromoCodeDiscountCalculatePost$Params } from '../api/fn/promo-code/promo-code-discount-calculate-post';
import { NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { Option } from 'src/app/shared/models/address/option';
import { AddressService } from 'src/app/address/address.service';
import { SelectInputComponent } from "../shared/select-input/select-input.component";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SharedService } from '../shared/shared.service';
import { OrderPost$Params } from '../api/fn/order/order-post';





@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  imports: [CommonModule, SharedModule, NgbTimepickerModule, FormsModule, MatStepperModule, MatIcon, SelectInputComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false },
    }
  ]
})
export class CartComponent implements OnInit {

  constructor(private accountService: AccountService,
    private mealService: MealsService,
    private promoCodeService: PromoCodeService,
    private addressService: AddressService,
    private sharedService: SharedService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
  ) {


    this.shippingInformationForm = this.formBuilder.group({
      buildingID: this.building,
      floorNo: this.floor,
      apartmentNo: this.apartment,
      promoCodeID: this.promoCodeInput,
      phoneNumber: this.phone,
      paymentOption: 1
    })

    this.floor.valueChanges.subscribe((newValue) => {
      this.apartment.setValue('')
      this.apartment.disable();
      if (newValue != '') this.apartment.enable();
    });

  }

  districts: Option[] = []
  streets: Option[] = []
  buildings: Option[] = []

  items = ['First', 'Second', 'Third', 'Forth'];

  district: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  street: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  building: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  floor: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  apartment: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });
  deliveryNotes: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  firstName: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],
  });

  lastName: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(3), Validators.maxLength(20)],
  });

  phone: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator, Validators.minLength(9), Validators.maxLength(13)],
  });

  shippingInformationForm: FormGroup = new FormGroup({});

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
    if (this.cartItems) {
      const mealOptionIDs: MealsMealOptionCartPost$Params = { body: this.cartItems.map(x => x.mealOptionID) }
      this.mealService.mealsMealOptionCartPost(mealOptionIDs).subscribe({
        next: (response) => {
          this.mealOptions = response
          this.mealOptions.forEach(mealOption => {
            mealOption.quantity = this.cartItems.find(x => x.mealOptionID === mealOption.mealOptionID)?.quantity ?? 0
            mealOption.timeOfDelivery = this.cartItems.find(x => x.mealOptionID === mealOption.mealOptionID)?.timeOfDelivery ?? "00:00:00"
          });
          this.total = this.calculateTotal()
        },
        error: error => {

        }
      })
    }
    this.district.disable();
    this.street.disable();
    this.building.disable();
    this.floor.disable();
    this.apartment.disable();

    this.addressService.getDistricts("cf9bcb15-258e-48ba-a9f6-fd1767413b46").subscribe({
      next: (districts: Option[]) => {
        this.districts = districts;
        this.district.enable();
      },
      error: (error) => {
      }
    });
  }

  calculateTotal(): number {
    this.mealOptions.forEach(mealOption => {
      this.total += mealOption.price * (mealOption.quantity ?? 0)
    });
    return this.total
  }

  confirmOrder(){
    if(this.shippingInformationForm.valid){
      // const createOrderRequest: CreateOrderRequest = {
      //   apartmentNo: this.apartment.value,
      //   buildingID?: this.building.value.id.
      //   customerID?: string;
      //   floorNo?: string | null;
      //   paymentOption?: PaymentOption;
      //   phoneNumber?: string | null;
      //   promoCodeID?: string | null;
      // }
      const orderPost$Params: OrderPost$Params = {
        body: {

        }
      }
      this.orderService.orderPost().subscribe({

      })
    }
  }

  applyPromoCode() {
    if (this.promoCodeInput.value) {

      const mealsData: MealData[] = []


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
      const request: PromoCodeDiscountCalculatePost$Params = { body: data };

      this.promoCodeService.promoCodeDiscountCalculatePost(request).subscribe({
        next: (response) => {
          this.discount = response as number
        },
        error: error => {
          this.promoCodeInput.setValue('')
          console.log(error.error)
          this.sharedService.showPopUp('danger', error)
          this.sharedService.showPopUp('danger', error)
          this.sharedService.showPopUp('danger', error)
          this.sharedService.showPopUp('danger', error)

        }
      })
    }
    else {
    }
  }

  districtOptionSelected = () => {
    this.street.setValue('')
    this.building.setValue('')
    this.street.disable();
    this.building.disable();
    if (this.district.value != null && this.district.value.id !== null){
      this.addressService.getStreets(this.district.value.id).subscribe({
        next: (streets: Option[]) => {
          this.streets = streets;
          this.street.enable();
        },
        error: (error) => {
        }
      });
    }// this.getStreets(this.district.value.id);
  }

  streetOptionSelected = () => {
    this.building.setValue('')
    this.building.disable();
    if (this.street.value != null && this.street.value.id !== null){
      this.addressService.getBuildings(this.street.value.id).subscribe({
        next: (buildings: Option[]) => {
          this.buildings = buildings;
          this.building.enable();
        },
        error: (error) => {
        }
      });
    } //this.getBuildings(this.street.value.id);
  }

  buildingOptionSelected = () => {
    this.floor.setValue('')
    this.floor.disable();
    if (this.building.value != null && this.building.value.id !== null) this.floor.enable();
  }

}
