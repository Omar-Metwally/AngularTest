/* tslint:disable */
/* eslint-disable */
import { GetSideDishOption } from '../models/get-side-dish-option';
export interface GetSideDishRequest {
  fullScreenImage?: string | null;
  getSideDishOptions?: Array<GetSideDishOption> | null;
  name?: string | null;
  sideDishID?: string;
  thumbnailImage?: string | null;
}
