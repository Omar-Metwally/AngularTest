import { Component, Input, OnInit } from '@angular/core';
import { mealCard } from './meal-card';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { environment } from 'src/environments/environment';


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

displayedImage: string = ''
displayedPrice: number = 0

ngOnInit(): void {
  // this.mealCardData.mealCardOptions =  Array(3).fill(null);
  this.displayedImage = `${environment.appUrl}images/meal/Thumbnail_${this.mealCardData.mealCardOptions[0].mealOptionID}.jpg`
  this.displayedPrice = this.mealCardData.mealCardOptions[0].mealOptionPrice
}
changeImage(mealOptionID: string, Price: number){
  this.displayedImage = `${environment.appUrl}images/meal/Thumbnail_${mealOptionID}.jpg`
  this.displayedPrice = Price;
}
}
