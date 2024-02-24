/* tslint:disable */
/* eslint-disable */
import { Cart } from '../models/cart';
import { HttpStatusCode } from '../models/http-status-code';
export interface CartCartResult {
  data?: Array<Cart> | null;
  errors?: Array<string> | null;
  httpStatusCode?: HttpStatusCode;
  isSuccess?: boolean;
}
