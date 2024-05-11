/* tslint:disable */
/* eslint-disable */
import { GetOrderItemOprion } from '../models/get-order-item-oprion';
import { OrderStatus } from '../models/order-status';
export interface GetOrderItem {
  chiefName?: string | null;
  deliveryDate?: string | null;
  expectedTimeOfDelivery?: string;
  getOrderItemOprions?: Array<GetOrderItemOprion> | null;
  mealID?: string;
  mealName?: string | null;
  mealOptionID?: string;
  mealOptionImage?: string | null;
  orderItemID?: number;
  orderStatus?: OrderStatus;
  pricePerUnit?: number;
  quantity?: number;
  totalAmount?: number;
}
