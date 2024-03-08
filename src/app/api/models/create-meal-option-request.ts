/* tslint:disable */
/* eslint-disable */
import { AddMealSideDish } from '../models/add-meal-side-dish';
import { MealSizeOption } from '../models/meal-size-option';
export interface CreateMealOptionRequest {
  availableQuantity?: number | null;
  image?: string | null;
  isAvailable?: boolean;
  mealID?: string;
  mealSideDishes?: Array<AddMealSideDish> | null;
  mealSizeOption?: MealSizeOption;
  price?: number;
  saveQuantitySetting?: boolean;
}
