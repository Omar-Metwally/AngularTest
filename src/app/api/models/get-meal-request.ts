/* tslint:disable */
/* eslint-disable */
import { GetMealOptionRequest } from '../models/get-meal-option-request';
import { GetMealTagRequest } from '../models/get-meal-tag-request';
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
export interface GetMealRequest {
  chiefID?: string | null;
  chiefImage?: string | null;
  chiefName?: string | null;
  description?: string | null;
  getMealOptionsRequest?: Array<GetMealOptionRequest> | null;
  mealCategory?: MealCategory;
  mealID?: string;
  mealSpiceLevel?: MealSpiceLevel;
  mealTags?: Array<GetMealTagRequest> | null;
  rating?: number | null;
  title?: string | null;
}
