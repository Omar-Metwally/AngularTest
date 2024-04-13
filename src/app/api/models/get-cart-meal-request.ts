/* tslint:disable */
/* eslint-disable */
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealStyle } from '../models/meal-style';
export interface GetCartMealRequest {
  availableQuantity?: number;
  image?: string | null;
  mealCategory?: MealCategory;
  mealID?: string;
  mealOptionID?: string;
  mealSpiceLevel?: MealSpiceLevel;
  mealStyle?: MealStyle;
  price?: number;
  rating?: number;
  title?: string | null;
}
