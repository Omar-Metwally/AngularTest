/* tslint:disable */
/* eslint-disable */
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealSizeOption } from './meal-size-option';
export interface GetMealTableRequest {
  category?: MealCategory;
  mealId?: string;
  isAvailable?: boolean;
  rating?: number;
  spiceLevel?: MealSpiceLevel;
  title?: string | null;
  totalSold?: number;
  GetMealOptionsTable: GetMealOptionTable[]
}

export interface GetMealOptionTable{
  mealOptionID?: string
  mealSizeOption?: MealSizeOption,
  isAvailable?: boolean,
  price?: number
  sold?: number
  thumbnailImage?: string
}
