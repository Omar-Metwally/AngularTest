import { Component, Input, OnInit } from '@angular/core';
import { mealCard } from './meal-card';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart/cart';


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
  @Input() addToCart!:(mealOptionID: string) => void;


  // addToCart(mealOptionID: string) {
  //   const cartString = localStorage.getItem('cart');
  //   if (cartString) {
  //     let cartItems: Cart[] = JSON.parse(cartString);
  //     let cartItem = cartItems.find(x => x.mealOptionID === mealOptionID);

  //     if (!cartItem) {
  //       cartItem = {
  //         mealOptionID: mealOptionID,
  //         quantity: 1,
  //       };
  //       cartItems.push(cartItem);
  //     } else {
  //       cartItem.quantity++;
  //     }
  //     localStorage.setItem('cart', JSON.stringify(cartItems));
  //   }
  //   else {
  //     let cartItems: Cart[] = []
  //     cartItems.push({
  //       mealOptionID: mealOptionID,
  //       quantity: 1
  //     })
  //     console.log(cartItems)
  //     localStorage.setItem('cart', JSON.stringify(cartItems));
  //   }
  // }

  displayedImage: string = ''
  displayedPrice: number = 0
  currentMealOptionID: string = ''

  ngOnInit(): void {
    this.displayedImage = `${environment.appUrl}images/meal/Thumbnail_${this.mealCardData.mealCardOptions[0].mealOptionID}.jpg`
    this.displayedPrice = this.mealCardData.mealCardOptions[0].mealOptionPrice
    this.currentMealOptionID = this.mealCardData.mealCardOptions[0].mealOptionID
  }
  changeImage(mealOptionID: string, Price: number) {
    this.displayedImage = `${environment.appUrl}images/meal/Thumbnail_${mealOptionID}.jpg`
    this.displayedPrice = Price;
    this.currentMealOptionID = mealOptionID;
  }
}
