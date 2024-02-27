/* tslint:disable */
/* eslint-disable */
import { MealData } from '../models/meal-data';
export interface DiscountCalculateRequest {
  mealData?: Array<MealData> | null;
  promoCodeID?: string | null;
}
