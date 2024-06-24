/* tslint:disable */
/* eslint-disable */
import { GetMealOptionRequest } from '../models/get-meal-option-request';
import { GetMealReview } from '../models/get-meal-review';
import { MealCategory } from '../models/meal-category';
import { MealSpiceLevel } from '../models/meal-spice-level';
import { MealStyle } from '../models/meal-style';
import { MealTag } from '../models/meal-tag';
export interface GetMealRequest {
  chiefDescription?: string | null;
  chiefID?: string | null;
  chiefImage?: string | null;
  chiefName?: string | null;
  chiefOrderCount?: number;
  createdDate?: string;
  description?: string | null;
  getMealOptionsRequest?: Array<GetMealOptionRequest> | null;
  getMealReviewsRequest?: Array<GetMealReview> | null;
  getSimilarMeals?: Array<GetMealRequest> | null;
  mealCategory?: MealCategory;
  mealID?: string;
  mealSpiceLevel?: MealSpiceLevel;
  mealStyle?: MealStyle;
  mealTags?: Array<MealTag> | null;
  rating?: number;
  reviewCount?: number;
  title?: string | null;
}
