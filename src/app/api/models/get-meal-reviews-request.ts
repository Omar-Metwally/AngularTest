/* tslint:disable */
/* eslint-disable */
import { GetMealReview } from '../models/get-meal-review';
export interface GetMealReviewsRequest {
  fiveStarCount?: number;
  fourStarCount?: number;
  mealID?: string;
  mealName?: string | null;
  mealReviews?: Array<GetMealReview> | null;
  oneStarCount?: number;
  rating?: number;
  threeStarCount?: number;
  twoStarCount?: number;
}
