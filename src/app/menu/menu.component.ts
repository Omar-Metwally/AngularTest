import { Component, OnInit } from '@angular/core';
import { MealCardComponent } from '../shared/meal-card/meal-card.component';
import { CartService, MealsService } from '../api/services';
import { mealCard, mealCardOption } from '../shared/meal-card/meal-card';
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
import { AccountService } from '../account/account.service';
import { CartPost$Params } from '../api/fn/cart/cart-post';
import { GetCartItemRequest, MealTag, UpsertCartItemRequest } from '../api/models';
import { Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { mealOption } from '../shared/models/meal/mealOption';
import { MatDialog } from '@angular/material/dialog';
import { MealChoicePopupComponent } from '../shared/meal-choice-popup/meal-choice-popup.component';


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
  imports: [NgbAccordionModule, MealCardComponent, MatCheckboxModule, CommonModule, SharedModule, InfiniteScrollModule, SelectInputComponent, ChipsAutoCompleteInputComponent, MatSliderModule]
})
export class MenuComponent implements OnInit {
  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  tagsOptions: Option[] = [];
  styleOptions: Option[] = [];
  sortByOptions: Option[] = [];
  selectedTags: Option[] = [];

  categoryFilter: number[] = []
  spiceFilter: number[] = []
  sizeFilter: number[] = []
  styleFilter: number[] = []
  activeDivIndex: number = -1;

  sortBy: FormControl = new FormControl({ id: '0', name: 'Best Selling' }, {
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

  hello1() {
    console.log(this.category.value)
  }

  toggleLoading = () => this.isLoading = !this.isLoading;

  bindData = (): void => {

    this.mealGetRequest = {
      SortBy: this.sortBy.value.id,
      StartPrice: this.startPrice.value ? this.startPrice.value : undefined,
      EndPrice: this.endPrice.value ? this.endPrice.value : undefined,
      TagFilter: this.selectedTags.length > 0 ? this.selectedTags.map((o: Option) => o.id as unknown as MealTag) : undefined,
      MealCategory: this.categoryFilter,
      MealSpiceLevel: this.spiceFilter,
      MealStyle: this.styleFilter,
      SizeFilter: this.sizeFilter,
      PageNumber: this.currentPage,
      PageSize: this.itemsPerPage
    }
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
  // postCart(cartItem: GetCartItemRequest) {
  //   const upsertCartRequest: GetCartItemRequest[] = [{ mealOptionID: cartItem.mealOptionID, quantity: cartItem.quantity }]
  //   const CartPostParams: CartPost$Params = {
  //     body: upsertCartRequest
  //   }
  //   this.cartService.cartPost(CartPostParams).subscribe({
  //     next: (response) => {
  //     },
  //     error: error => {
  //       if (error.error.errors) {
  //         this.errorMessages = error.error.errors;
  //       } else {
  //         this.errorMessages.push(error.error);
  //       }
  //     }
  //   })
  // }

  hello = () => {
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

  appendData = () => {
    this.toggleLoading();
    this.mealsService.mealsGet(this.mealGetRequest).subscribe({
      next: response => this.mealsCard = [...this.mealsCard, ...response.map(request => ({
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
      }))],
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    })
  }

  onScroll = () => {
    this.mealGetRequest.PageNumber = (this.mealGetRequest.PageNumber ?? 0) + 1;
    this.appendData();
  }

  categoryFiltering(event: MatCheckboxChange): void {
    if (event.checked) {
      if (!this.categoryFilter.includes(+event.source.value)) {
        this.categoryFilter.push(+event.source.value);
      }
    } else {
      const index = this.categoryFilter.indexOf(+event.source.value);
      if (index !== -1) {
        this.categoryFilter.splice(index, 1);
      }
    }
    this.hello();
  }

  spiceFiltering(event: MatCheckboxChange): void {
    if (event.checked) {
      if (!this.spiceFilter.includes(+event.source.value)) {
        this.spiceFilter.push(+event.source.value);
      }
    } else {
      const index = this.spiceFilter.indexOf(+event.source.value);
      if (index !== -1) {
        this.spiceFilter.splice(index, 1);
      }
    }
    this.hello();
  }

  sizeFiltering(event: MatCheckboxChange): void {
    if (event.checked) {
      if (!this.sizeFilter.includes(+event.source.value)) {
        this.sizeFilter.push(+event.source.value);
      }
    } else {
      const index = this.sizeFilter.indexOf(+event.source.value);
      if (index !== -1) {
        this.sizeFilter.splice(index, 1);
      }
    }
    this.hello();
  }

  toggleBoxShadow(event: MouseEvent, index: number) {
    const target = event.target as HTMLElement;

    if (this.activeDivIndex === index) {
      target.classList.remove('active');
      this.activeDivIndex = -1;
      this.styleFilter = []
      this.style.setValue(null);
    } else {
      this.style.setValue(index);
      this.styleFilter = [];
      this.styleFilter.push(index)
      if (this.activeDivIndex !== -1) {
        const prevActiveDiv = document.querySelector('.box-style-option.active');
        if (prevActiveDiv) {
          prevActiveDiv.classList.remove('active');
        }
      }
      target.classList.add('active');
      this.activeDivIndex = index;
    }
    this.hello();
  }

  errorMessages: string[] = [];
  constructor(private mealsService: MealsService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private cartService: CartService,
    private router: Router,
    public dialog: MatDialog) {
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
