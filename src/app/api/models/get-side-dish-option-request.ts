/* tslint:disable */
/* eslint-disable */
import { MealSizeOption } from '../models/meal-size-option';
export interface GetSideDishOptionRequest {
  availableQuantity?: number;
  fullScreenImage?: string | null;
  name?: string | null;
  price?: number;
  sideDishID?: string;
  sideDishSizeOption?: MealSizeOption;
  thumbnailImage?: string | null;
}
