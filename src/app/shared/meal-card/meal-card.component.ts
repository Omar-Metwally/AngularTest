import { Component, Input, OnInit } from '@angular/core';
import { mealCard, mealCardOption } from './meal-card';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css'
})
export class MealCardComponent implements OnInit {

  @Input() mealCardData: mealCard = {
    mealID: '',
    chiefID: '',
    title: '',
    chiefName: '',
    chiefImage: '',
    rating: 0,
    reviewsCount: 0,
    mealCardOptions: [],
  }
  @Input() addToCart!: (mealOptionID: string) => void;
  @Input() redirectToMeal!: (event: Event, mealOptionID: string) => void;

  currentMealOption: mealCardOption = {
    mealOptionID: '',
    mealOptionSize: 0,
    mealOptionImage: '',
    mealOptionPrice: 0,
    IsAvailable: false
  }

  // constructor(private router: Router) { }


  // redirectToMeal(event: Event) {
  //   if ((event.target as HTMLElement).tagName === 'DIV') {
  //     this.router.navigate(['/meal', this.mealCardData.mealID]);
  //   }
  // }

  displayedImage: string = ''
  displayedPrice: number = 0
  currentMealOptionID: string = ''

  ngOnInit(): void {
    this.currentMealOption = this.mealCardData.mealCardOptions[0]
    this.displayedImage = this.currentMealOption.mealOptionImage
    this.displayedPrice = this.currentMealOption.mealOptionPrice
    this.currentMealOptionID = this.currentMealOption.mealOptionID
  }
  changeCurrentMealOption(mealOptionIndex: number){
    this.currentMealOption = this.mealCardData.mealCardOptions[mealOptionIndex]
    this.displayedImage = this.currentMealOption.mealOptionImage
    this.displayedPrice = this.currentMealOption.mealOptionPrice;
    this.currentMealOptionID = this.currentMealOption.mealOptionID;
  }
  changeImage(mealOptionID: string, Price: number) {
    this.displayedImage = this.currentMealOption.mealOptionImage
    this.displayedPrice = Price;
    this.currentMealOptionID = mealOptionID;
  }
}
