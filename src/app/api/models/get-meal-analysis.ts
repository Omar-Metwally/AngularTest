/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetMealAnalysis {
  image?: string | null;
  mealID?: string;
  mealOptionID?: string;
  mealSizeOption?: MealSizeOption;
  name?: string | null;
  soldAmount?: number;
  totalCost?: number;
  totalRevenue?: number;
}
