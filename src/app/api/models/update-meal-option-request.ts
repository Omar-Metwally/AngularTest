/* tslint:disable */
/* eslint-disable */
import { AddMealSideDish } from '../models/add-meal-side-dish';
export interface UpdateMealOptionRequest {
  availableQuantity?: number | null;
  image?: string | null;
  isAvailable?: boolean;
  mealOptionID?: string;
  mealSideDishes?: Array<AddMealSideDish> | null;
  price?: number;
  saveQuantitySetting?: boolean;
}
