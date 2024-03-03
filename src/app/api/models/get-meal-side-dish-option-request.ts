/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetMealSideDishOptionRequest {
  mealSideDishID?: string;
  price?: number;
  quantity?: number;
  sideDishSizeOption?: MealSizeOption;
}
