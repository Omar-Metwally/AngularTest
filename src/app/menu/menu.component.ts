import { Component, OnInit } from '@angular/core';
import { MealCardComponent } from '../shared/meal-card/meal-card.component';
import { MealsService } from '../api/services';
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
    imports: [MealCardComponent, CommonModule, SharedModule, InfiniteScrollModule, SelectInputComponent, ChipsAutoCompleteInputComponent, MatSliderModule]
})
export class MenuComponent implements OnInit {
  categoryOptions: Option[] = [];
  spiceLevelOptions: Option[] = [];
  tagsOptions: Option[] = [];
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
  startPrice: FormControl = new FormControl('',{
    validators: [Validators.min(0), Validators.max(5000)]
  })
  endPrice: FormControl = new FormControl('',{
    validators: [Validators.min(0), Validators.max(5000)]
  })
  filterForm: FormGroup = new FormGroup({});
  mealGetRequest: MealsGet$Params = {
    PageNumber:1,
    PageSize:5,
    SortBy:1,
  }
  mealsCard: mealCard[] = []
  isLoading=false;
  currentPage=1;
  itemsPerPage=10;

  toggleLoading = ()=>this.isLoading=!this.isLoading;

  // loadData= ()=>{
  //   this.filterForm.valueChanges.subscribe({
      
  //   })
  //   this.toggleLoading();
  //   this.mealsService.mealsGet(this.mealGetRequest).subscribe({
  //     next: (body) => {
  //       this.mealsCard = body.map(request => ({
  //         mealID: request.mealID || '',
  //         chiefID: request.chiefID || '',
  //         title: request.title || '',
  //         chiefName: request.chiefName || '',
  //         chiefImage: request.chiefImage || '',
  //         rating: request.rating || 0,
  //         reviewsCount: 0, // You need to provide the source for reviewsCount
  //         mealCardOptions: request.getMealOptionsRequest?.map(option => ({
  //           mealOptionID: option.mealOptionID || '',
  //           mealOptionSize: option.mealSizeOption || 0, // Assuming MealSizeOption is a number
  //           mealOptionImage: option.image || '',
  //           mealOptionPrice: option.price || 0,
  //           IsAvailable: option.isAvailable || false
  //         })).sort((a, b) => a.mealOptionSize - b.mealOptionSize) || []
  //       }));
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
  loadData = () => {
    this.filterForm.valueChanges.subscribe((changes) => {
      console.log(changes)
      this.toggleLoading();
      this.filterForm.valueChanges.subscribe(() => {
        this.mealsService.mealsGet(this.mealGetRequest).subscribe({
          next: (body) => {
            this.mealGetRequest.PageNumber = 1
            this.mealsCard = body.map(request => ({
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
                mealOptionImage: option.image || '',
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
      });
    });
  };
  

  ngOnInit(): void {
    this.categoryOptions.push({ id: '0', name: 'Main Dish' }, { id: '1', name: 'Side Dish' }, { id: '2', name: 'Appetizer' });
    this.sortByOptions.push({ id: '0', name: 'Best Selling' }, { id: '1', name: 'Newly Added' }, { id: '2', name: 'Price Asc' }, { id: '2', name: 'Price Desc' });
    this.spiceLevelOptions.push({ id: '0', name: 'Not Spicy' }, { id: '1', name: 'Mild' }, { id: '2', name: 'Medium' }, { id: '3', name: 'Hot' }, { id: '4', name: 'Very Hot' });
    this.tagsOptions.push({ id: '1', name: 'Healthy' }, { id: '3', name: 'Keto' }, { id: '6cea3c8b-ae0c-44a8-ad6d-4f2ff7f7e1df', name: 'Not Healthy' }, { id: '6cea3c8b-ae0c-44a8-ad6d-4f2ff7f7e1dc', name: 'Wrong ID' }, { id: '4', name: 'Very Hot' });
    this.loadData();
  }
  
  // this method will be called on scrolling the page
  appendData= ()=>{
  this.toggleLoading();
  this.mealsService.mealsGet(this.mealGetRequest).subscribe({
    next:response=>this.mealsCard = [...this.mealsCard,...response.map(request => ({
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
            mealOptionImage: option.image || '',
            mealOptionPrice: option.price || 0,
            IsAvailable: option.isAvailable || false
          })).sort((a, b) => a.mealOptionSize - b.mealOptionSize) || []
        }))],
    error:err=>console.log(err),
    complete:()=>this.toggleLoading()
  })
  }

  onScroll= ()=>{
    this.mealGetRequest.PageNumber = (this.mealGetRequest.PageNumber ?? 0) + 1;
    this.appendData();
  }


  errorMessages: string[] = [];
  constructor(private mealsService: MealsService,
    private formBuilder: FormBuilder) {
      this.filterForm = this.formBuilder.group({
        TagFilter: this.tags,
        SortBy: this.sortBy,
        StartPrice: this.startPrice,
        EndPrice: this.endPrice,
      })
  }



}
