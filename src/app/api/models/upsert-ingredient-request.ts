/* tslint:disable */
/* eslint-disable */
import { FoodIngredient } from '../models/food-ingredient';
export interface UpsertIngredientRequest {
  delete?: boolean;
  ingredient?: FoodIngredient;
  pricePerKilo?: number;
}
