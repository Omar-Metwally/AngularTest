/* tslint:disable */
/* eslint-disable */
import { GetCartItemOptionRequest } from '../models/get-cart-item-option-request';
import { MealSizeOption } from '../models/meal-size-option';
export interface GetCartItemRequest {
  availableQuantity?: number;
  cartItemID?: number;
  cartItemOptions?: Array<GetCartItemOptionRequest> | null;
  image?: string | null;
  mealOptionID: string;
  mealSizeOption?: MealSizeOption;
  name?: string | null;
  price?: number;
  quantity: number;
  totalPrice?: number;
}
