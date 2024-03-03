/* tslint:disable */
/* eslint-disable */
import { SelectedSideDish } from '../models/selected-side-dish';
export interface Cart {
  mealOptionID: string;
  quantity: number;
  selectedSideDishes?: Array<SelectedSideDish> | null;
  timeOfDelivery?: string;
}
