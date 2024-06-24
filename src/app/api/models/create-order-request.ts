/* tslint:disable */
/* eslint-disable */
import { PaymentOption } from '../models/payment-option';
export interface CreateOrderRequest {
  apartmentNo?: string | null;
  buildingID?: string;
  floorNo?: string | null;
  paymentOption?: PaymentOption;
  phoneNumber?: string | null;
  promoCodeID?: string | null;
  timeOfDelivery?: string | null;
}
