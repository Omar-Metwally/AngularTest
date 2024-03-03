/* tslint:disable */
/* eslint-disable */
import { PaymentOption } from '../models/payment-option';
export interface CreateOrderRequest {
  apartmentNo?: string | null;
  buildingID?: string;
  customerID?: string;
  floorNo?: string | null;
  paymentOption?: PaymentOption;
  phoneNumber?: string | null;
  promoCodeID?: string | null;
}
