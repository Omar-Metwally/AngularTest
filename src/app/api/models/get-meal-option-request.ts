/* tslint:disable */
/* eslint-disable */
import { GetMealSideDishRequest } from '../models/get-meal-side-dish-request';
import { MealSizeOption } from '../models/meal-size-option';
import { UsedIngredient } from '../models/used-ingredient';
export interface GetMealOptionRequest {
  fullScreenImage?: string | null;
  getMealSideDishesRequest?: Array<GetMealSideDishRequest> | null;
  isAvailable?: boolean;
  mealOptionID?: string;
  mealSizeOption?: MealSizeOption;
  price?: number;
  quantity?: number;
  saveQuantity?: boolean;
  thumbnailImage?: string | null;
  usedIngredients?: Array<UsedIngredient> | null;
}
