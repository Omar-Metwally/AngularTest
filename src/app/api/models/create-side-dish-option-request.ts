/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface CreateSideDishOptionRequest {
  price?: number;
  quantity?: number;
  sideDishID?: string;
  sideDishSizeOption?: MealSizeOption;
}
