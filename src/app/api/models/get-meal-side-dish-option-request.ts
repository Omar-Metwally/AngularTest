/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetMealSideDishOptionRequest {
  name?: string | null;
  price?: number;
  quantity?: number;
  sideDishID?: string;
  sideDishSizeOption?: MealSizeOption;
}
