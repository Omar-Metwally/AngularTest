/* tslint:disable */
/* eslint-disable */
import { GetCartItemRequest } from '../models/get-cart-item-request';
export interface GetCartRequest {
  cartItems?: Array<GetCartItemRequest> | null;
  deliverNow?: boolean;
  endTime?: string | null;
  startTime?: string | null;
  timeOfDelivery?: string | null;
}
