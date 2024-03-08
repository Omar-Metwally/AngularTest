import { Component, OnInit } from '@angular/core';
import { MealCardComponent } from '../shared/meal-card/meal-card.component';
import { CartService, MealsService } from '../api/services';
import { mealCard } from '../shared/meal-card/meal-card';
import { MealsGet$Params } from '../api/fn/meals/meals-get';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { trigger, transition, style, animate } from '@angular/animations';
import { SelectInputComponent } from "../shared/select-input/select-input.component";
import { Option } from 'src/app/shared/models/address/option';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChipsAutoCompleteInputComponent } from "../shared/chips-auto-complete-input/chips-auto-complete-input.component";
import { MatSliderModule } from '@angular/material/slider';
import { Cart } from '../api/models/cart'
import { AccountService } from '../account/account.service';
import { CartPost$Params } from '../api/fn/cart/cart-post';
import { MealTag, UpsertCartRequest } from '../api/models';
import { Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
  imports: [NgbAccordionModule,MealCardComponent, CommonModule, SharedModule, InfiniteScrollModule, SelectInputComponent, ChipsAutoCompleteInputComponent, MatSliderModule]
})
export class MenuComponent implements OnInit {
  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  tagsOptions: Option[] = [];
  styleOptions: Option [] = [];
  sortByOptions: Option[] = [];
  selectedTags: Option[] = [];


  sortBy: FormControl = new FormControl('', {
  });
  category: FormControl = new FormControl('', {
  });
  spiceLevel: FormControl = new FormControl('', {
  });
  tags: FormControl = new FormControl('', {
  });
  style: FormControl = new FormControl('', {
  });
  startPrice: FormControl = new FormControl(0, {
    validators: [Validators.min(0), Validators.max(5000)]
  })
  endPrice: FormControl = new FormControl(5000, {
    validators: [Validators.min(0), Validators.max(5000)]
  })
  filterForm: FormGroup = new FormGroup({});
  mealGetRequest: MealsGet$Params = {
    PageNumber: 1,
    PageSize: 5,
    SortBy: 0,
    TagFilter: [],
    SizeFilter: [],
    StartPrice: 0,
    EndPrice: 5000,
  }
  mealsCard: mealCard[] = []
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;

  toggleLoading = () => this.isLoading = !this.isLoading;

  bindData = (): void => {
    
    this.mealGetRequest = {
      SortBy: this.sortBy.value.id,
      StartPrice: this.startPrice.value ? this.startPrice.value : undefined,
      EndPrice: this.endPrice.value ? this.endPrice.value : undefined,
      TagFilter: this.selectedTags.length > 0 ? this.selectedTags.map((o: Option) => o.id as unknown as MealTag) : undefined,
      MealCategory: this.category.value.id,
      MealSpiceLevel: this.spiceLevel.value.id,
      MealStyle: this.style.value.id,
      PageNumber: this.currentPage,
      PageSize: this.itemsPerPage
    }
  }

  redirectToMeal = (event: Event,mealID: string) => {
    if ((event.target as HTMLElement).tagName === 'DIV') {
      this.router.navigate(['/meal', mealID]);
    }
  }

  addToCart = (mealOptionID: string) => {
    // const isUserLoggedIn = this.accountService.isUserLoggedIn();
    // const cartString = localStorage.getItem('cart');
    // if (cartString) {
    //   let cartItems: Cart[] = JSON.parse(cartString);
    //   let cartItem = cartItems.find(x => x.mealOptionID === mealOptionID);

    //   if (!cartItem) {
    //     cartItem = {
    //       mealOptionID: mealOptionID,
    //       quantity: 1,
    //     };
    //     cartItems.push(cartItem);
    //   } else {
    //     cartItem.quantity++;
    //   }
    //   localStorage.setItem('cart', JSON.stringify(cartItems));
    //   if (isUserLoggedIn) this.postCart(cartItem)
    // }
    // else {
    //   let cartItems: Cart[] = []
    //   cartItems.push({
    //     mealOptionID: mealOptionID,
    //     quantity: 1
    //   })
    //   localStorage.setItem('cart', JSON.stringify(cartItems));
    //   if (isUserLoggedIn) this.postCart(cartItems[0])
    // }
    const cartItem : Cart = { mealOptionID: mealOptionID, quantity: 1 }
    this.accountService.addItemToCart(cartItem)
  }
  postCart(cartItem: Cart) {
    const upsertCartRequest: UpsertCartRequest[] = [{mealOptionID: cartItem.mealOptionID, quantity: cartItem.quantity}]
    const CartPostParams: CartPost$Params = {
      body: upsertCartRequest
    }
    this.cartService.cartPost(CartPostParams).subscribe({
      next: (response) => {
      },
      error: error => {
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          this.errorMessages.push(error.error);
        }
      }
    })
  }

  hello = () => {
    console.log(this.mealGetRequest)
    this.toggleLoading();
    this.bindData()
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
          reviewsCount: 0,
          mealCardOptions: request.getMealOptionsRequest?.map(option => ({
            mealOptionID: option.mealOptionID || '',
            mealOptionSize: option.mealSizeOption || 0,
            mealOptionImage: option.thumbnailImage || '',
            mealOptionPrice: option.price || 0,
            IsAvailable: option.isAvailable || false
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

  loadData = () => {
    this.endPrice.valueChanges.subscribe(() => {

    });
  };


  ngOnInit(): void {
    this.categoryOptions.push({ id: '0', name: 'Main Dish' }, { id: '1', name: 'Side Dish' }, { id: '2', name: 'Appetizer' });
    this.sortByOptions.push({ id: '0', name: 'Best Selling' }, { id: '1', name: 'Newly Added' }, { id: '2', name: 'Price Asc' }, { id: '3', name: 'Price Desc' });
    this.spiceLevelOptions.push({ id: '0', name: 'Not Spicy' }, { id: '1', name: 'Mild' }, { id: '2', name: 'Medium' }, { id: '3', name: 'Hot' }, { id: '4', name: 'Very Hot' });
    this.styleOptions.push({ id: '0', name: 'Egyptian' }, { id: '1', name: 'Syrian' }, { id: '2', name: 'Lebanese' }, { id: '3', name: 'Western' }, { id: '4', name: 'Asian' }, { id: '5', name: 'Indian' })
    this.tagsOptions.push(    
      { id: '0', name: 'Koshry' },
      { id: '1', name: 'SeaFood' },
      { id: '2', name: 'Deep Fried' },
      { id: '3', name: 'Vegan' },
      { id: '4', name: 'Diet Friendly' },
      { id: '5', name: 'Keto Friendly' },
      { id: '6', name: 'Natural Butter' },
      { id: '7', name: 'Sweats' },
      { id: '8', name: 'Gluten Free' },
      { id: '9', name: 'Slow Cooked' },
      { id: '10', name: 'Natural Colors' },
      { id: '11', name: 'Biscuits' },
      { id: '12', name: 'Cookies' },
      { id: '13', name: 'Cake' },
      { id: '14', name: 'Beef' },
      { id: '15', name: 'Lamb' },
      { id: '16', name: 'Ribs' },);
      this.hello();
  }

  // this method will be called on scrolling the page
  appendData = () => {
    this.toggleLoading();
    this.mealsService.mealsGet(this.mealGetRequest).subscribe({
      next: response => this.mealsCard = [...this.mealsCard, ...response.map(request => ({
        mealID: request.mealID || '',
        chiefID: request.chiefID || '',
        title: request.title || '',
        chiefName: request.chiefName || '',
        chiefImage: request.chiefImage || '',
        rating: request.rating || 0,
        reviewsCount: 0, // You need to provide the source for reviewsCount
        mealCardOptions: request.getMealOptionsRequest?.map(option => ({
          mealOptionID: option.mealOptionID || '',
          mealOptionSize: option.mealSizeOption || 0, // Assuming MealSizeOption is a number
          mealOptionImage: option.thumbnailImage || '',
          mealOptionPrice: option.price || 0,
          IsAvailable: option.isAvailable || false
        })).sort((a, b) => a.mealOptionSize - b.mealOptionSize) || []
      }))],
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    })
  }

  onScroll = () => {
    this.mealGetRequest.PageNumber = (this.mealGetRequest.PageNumber ?? 0) + 1;
    this.appendData();
  }


  errorMessages: string[] = [];
  constructor(private mealsService: MealsService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private cartService: CartService,
    private router: Router) {
    this.filterForm = this.formBuilder.group({
      CategoryFilter: this.category,
      SpiceLevelFilter: this.spiceLevel,
      TagFilter: this.tags,
      SortBy: this.sortBy,
      MealStyle: this.style,
      StartPrice: this.startPrice,
      EndPrice: this.endPrice,
    })
  }



}
