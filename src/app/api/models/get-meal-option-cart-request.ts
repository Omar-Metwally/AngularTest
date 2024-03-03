/* tslint:disable */
/* eslint-disable */
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealStyle } from '../models/meal-style';
export interface GetMealOptionCartRequest {
  timeOfDelivery: string;
  availableQuantity: number;
  image?: string | null;
  mealCategory: MealCategory;
  mealID: string;
  mealOptionID: string;
  mealSpiceLevel: MealSpiceLevel;
  mealStyle?: MealStyle;
  price: number;
  quantity: number | null;
  rating?: number;
  title?: string | null;
}
