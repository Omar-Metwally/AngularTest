/* tslint:disable */

import { MealSizeOption } from "./meal-size-option";

/* eslint-disable */
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
