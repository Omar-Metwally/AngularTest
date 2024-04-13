/* tslint:disable */
/* eslint-disable */
import { AddIngredient } from '../models/add-ingredient';
import { AddMealSideDish } from '../models/add-meal-side-dish';
export interface UpdateMealOptionRequest {
  addIngredients?: Array<AddIngredient> | null;
  availableQuantity?: number | null;
  image?: string | null;
  isAvailable?: boolean;
  mealOptionID?: string;
  mealSideDishes?: Array<AddMealSideDish> | null;
  price?: number;
  saveQuantitySetting?: boolean;
}
