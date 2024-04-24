import { Component, OnInit } from '@angular/core';
import { CreateOrderRequest, GetCartItemRequest, GetCartRequest, GetMealOptionRequest } from '../api/models';
import { AccountService } from '../account/account.service';
import { CartService, MealsService, OrderService, PromoCodeService } from '../api/services';
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
import { SafePipe } from '../safe-url.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartDelete$Params } from '../api/fn/cart/cart-delete';
import { CartPatch$Params } from '../api/fn/cart/cart-patch';
import { HttpResponse } from '@angular/common/http';





@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  imports: [SafePipe, CommonModule, SharedModule, NgbTimepickerModule, FormsModule, MatStepperModule, MatIcon, SelectInputComponent],
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
    private snackBar: MatSnackBar,
    private cartService: CartService,
  ) {
     this.cartService.cartPost$Response().subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.cart = response.body as GetCartRequest
          this.calculateTotal()
        } else if (response.status === 202) {
          this.cart = response.body.data as GetCartRequest
          this.calculateTotal()

        }
      },
      error: error => {
      }
    })

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
  iframeLink: string = ''
  cartSubTotalBeforeDiscount: number = 0;
  cartSubTotalAfterDiscount = 20

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

  cart: GetCartRequest = {}
  mealOptions: GetMealOptionRequest[] = [];
  discount = 0;
  total = 0
  promoCodeInput: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.nullValidator],
  });

  time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;


   ngOnInit() {
    // this.cart = await this.accountService.updateCartItemsFromAPI() ?? { cartItems: [] };
    this.calculateTotal();
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

  calculateTotal() {
    this.cartSubTotalBeforeDiscount = 0;
    this.cart?.cartItems?.forEach(cartItem => {
      this.cartSubTotalBeforeDiscount += (cartItem.totalPrice ?? 0) * (cartItem.quantity ?? 0)
    });
    this.cartSubTotalAfterDiscount = this.cartSubTotalBeforeDiscount;
    this.cartSubTotalAfterDiscount += 20
    this.cartSubTotalAfterDiscount.toPrecision(2)
  }

  confirmOrder() {
    console.log(this.shippingInformationForm.errors)
    if (true) {
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
          apartmentNo: this.apartment.value,
          buildingID: this.building.value.id,
          floorNo: this.floor.value,
          paymentOption: 1,
          phoneNumber: this.phone.value,
          promoCodeID: this.promoCodeInput.value,
        }
      }
      this.orderService.orderPost(orderPost$Params).subscribe({
        next: (response: any) => {
          console.log(response)
          this.iframeLink = `https://accept.paymob.com/api/acceptance/iframes/807851?payment_token=${response.token}`
          console.log(this.iframeLink)
        },
        error: error => {
          console.log(error.error)
        }
      })
    }
  }

  removeItemCart(cartItem: GetCartItemRequest) {
    const index = this.cart.cartItems?.findIndex(item => item.cartItemID === cartItem.cartItemID);
    if (index !== undefined && index !== -1) {
      this.cart.cartItems?.splice(index, 1);
    }
    const cartDelete: CartDelete$Params = {
      body: {
        cartItemID: cartItem.cartItemID
      }
    };
    this.cartService.cartDelete(cartDelete).subscribe();
    this.accountService.setCart(this.cart)
    this.calculateTotal()
  }

  applyPromoCode() {
    if (this.promoCodeInput.value) {
      const value: string = `"${this.promoCodeInput.value}"`
      console.log(value)
      const request: PromoCodeDiscountCalculatePost$Params = { body: value };

      this.promoCodeService.promoCodeDiscountCalculatePost(request).subscribe({
        next: (response) => {
          this.cartSubTotalAfterDiscount = response
          this.cartSubTotalAfterDiscount
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
    if (this.district.value != null && this.district.value.id !== null) {
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
    if (this.street.value != null && this.street.value.id !== null) {
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

  decrementQuantity(cartItem: GetCartItemRequest) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--
      this.calculateTotal()
      const CartPatch: CartPatch$Params = {
        cartItemID: cartItem.cartItemID,
        amount: -1
      }
      this.cartService.cartPatch(CartPatch).subscribe();
    }

  }
  incrementQuantity(cartItem: GetCartItemRequest) {
    if (cartItem.quantity < (cartItem.availableQuantity === undefined ? 3 : cartItem.availableQuantity)) {
      cartItem.quantity++
      this.calculateTotal()
      const CartPatch: CartPatch$Params = {
        cartItemID: cartItem.cartItemID,
        amount: 1
      }
      this.cartService.cartPatch(CartPatch).subscribe();
    }
    else {
      this.snackBar.open(`you cannot add more than ${cartItem.availableQuantity} for ${cartItem.name}`, 'Close', {
        duration: 1500,
        panelClass: 'my-snackbar-background'
      });
    }
  }

}
