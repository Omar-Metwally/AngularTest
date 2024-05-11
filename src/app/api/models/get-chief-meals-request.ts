/* tslint:disable */
/* eslint-disable */
import { GetMealRequest } from '../models/get-meal-request';
export interface GetChiefMealsRequest {
  chiefID?: string | null;
  chiefName?: string | null;
  coverImage?: string | null;
  description?: string | null;
  isOnline?: boolean;
  meals?: Array<GetMealRequest> | null;
  ordersDone?: number;
  prfileImage?: string | null;
  rating?: number;
  reviewCount?: number;
}
