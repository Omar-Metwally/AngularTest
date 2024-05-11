/* tslint:disable */
/* eslint-disable */
import { GetOrderItem } from '../models/get-order-item';
import { PaymentOption } from '../models/payment-option';
export interface GetOrderRequest {
  apartmentNo?: string | null;
  building?: string | null;
  discountPercentage?: number | null;
  district?: string | null;
  floorNo?: string | null;
  getOrderItems?: Array<GetOrderItem> | null;
  orderDate?: string;
  orderID?: string;
  paymentOption?: PaymentOption;
  phoneNumber?: string | null;
  promoCodeID?: string | null;
  street?: string | null;
  totalAmount?: number;
}
