/* tslint:disable */
/* eslint-disable */
import { AddIngredient } from '../models/add-ingredient';
import { AddMealSideDish } from '../models/add-meal-side-dish';
import { MealSizeOption } from '../models/meal-size-option';
export interface CreateMealOptionRequest {
  addIngredients?: Array<AddIngredient> | null;
  availableQuantity?: number | null;
  image?: string | null;
  isAvailable?: boolean;
  mealID?: string;
  mealSideDishes?: Array<AddMealSideDish> | null;
  mealSizeOption?: MealSizeOption;
  price?: number;
  saveQuantitySetting?: boolean;
}
