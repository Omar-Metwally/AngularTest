/* tslint:disable */
/* eslint-disable */
import { Time } from '@angular/common';
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealStyle } from '../models/meal-style';
export interface GetMealOptionCartRequest {
  image: string | null;
  mealCategory: MealCategory;
  mealID: string;
  mealOptionID: string;
  mealSpiceLevel: MealSpiceLevel;
  mealStyle: MealStyle;
  price: number;
  quantity?: number;
  availableQuantity: number;
  rating: number;
  title: string | null;
  timeOfDelivery: string
}
