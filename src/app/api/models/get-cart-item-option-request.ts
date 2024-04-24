/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetCartItemOptionRequest {
  isFree?: boolean;
  isTopping?: boolean;
  mealSideDishID?: string;
  mealSideDishOptionID?: string;
  name?: string | null;
  price?: number | null;
  sideDishSizeOption?: MealSizeOption;
}
