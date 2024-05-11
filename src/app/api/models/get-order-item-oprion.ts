/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetOrderItemOprion {
  isFree?: boolean;
  pricePerUnit?: number;
  sideDishID?: string;
  sideDishName?: string | null;
  sideDishSizeOption?: MealSizeOption;
}
