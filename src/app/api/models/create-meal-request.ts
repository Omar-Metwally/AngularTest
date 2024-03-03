/* tslint:disable */
/* eslint-disable */
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealStyle } from '../models/meal-style';
import { MealTag } from '../models/meal-tag';
export interface CreateMealRequest {
  description?: string | null;
  mealCategory?: MealCategory;
  mealSpiceLevel?: MealSpiceLevel;
  mealStyle?: MealStyle;
  name?: string | null;
  tagsID?: Array<MealTag> | null;
}
