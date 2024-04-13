/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetMealOptionTable {
  isAvailable?: boolean;
  mealOptionID?: string;
  mealSizeOption?: MealSizeOption;
  price?: number;
  sold?: number;
  thumbnailImage?: string | null;
}
