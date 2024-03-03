/* tslint:disable */
/* eslint-disable */
import { GetMealSideDishOptionRequest } from '../models/get-meal-side-dish-option-request';
export interface GetMealSideDishRequest {
  getMealSideDishOptionsRequest?: Array<GetMealSideDishOptionRequest> | null;
  isFree?: boolean;
  isTopping?: boolean;
  mealSideDishID?: string;
}
