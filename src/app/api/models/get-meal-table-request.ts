/* tslint:disable */
/* eslint-disable */
import { GetMealOptionTable } from '../models/get-meal-option-table';
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealStyle } from '../models/meal-style';
export interface GetMealTableRequest {
  category?: MealCategory;
  getMealOptionsTable?: Array<GetMealOptionTable> | null;
  isAvailable?: boolean;
  mealID?: string;
  mealStyle?: MealStyle;
  rating?: number;
  spiceLevel?: MealSpiceLevel;
  title?: string | null;
}
