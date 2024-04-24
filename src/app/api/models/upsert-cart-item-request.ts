/* tslint:disable */
/* eslint-disable */
import { SelectedSideDish } from '../models/selected-side-dish';
export interface UpsertCartItemRequest {
  mealOptionID?: string;
  quantity?: number;
  sideDishes?: Array<SelectedSideDish> | null;
}
