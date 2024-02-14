/* tslint:disable */
/* eslint-disable */
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
export interface GetMealTableRequest {
  category?: MealCategory;
  id?: string;
  isAvailable?: boolean;
  rating?: number;
  spiceLevel?: MealSpiceLevel;
  title?: string | null;
  totalSold?: number;
}
