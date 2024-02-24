/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetMealOptionRequest {
  image?: string | null;
  isAvailable?: boolean;
  mealOptionID?: string;
  mealSizeOption?: MealSizeOption;
  price?: number;
  quantity?: number;
  saveQuantity?: boolean;
}
