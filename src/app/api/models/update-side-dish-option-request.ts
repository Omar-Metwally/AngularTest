/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface UpdateSideDishOptionRequest {
  price?: number | null;
  quantity?: number | null;
  sideDishID?: string;
  sideDishSizeOption?: MealSizeOption;
}
