/* tslint:disable */
/* eslint-disable */
import { AddMealSideDishOption } from '../models/add-meal-side-dish-option';
export interface AddMealSideDish {
  isFree?: boolean;
  isTopping?: boolean;
  sideDishOptions?: Array<AddMealSideDishOption> | null;
}
