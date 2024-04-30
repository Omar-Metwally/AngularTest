/* tslint:disable */
/* eslint-disable */
import { FoodIngredient } from '../models/food-ingredient';
export interface GetIngredientAnalysis {
  costPerKilo?: number;
  ingredient?: FoodIngredient;
  usedAmountInGrams?: number;
}
