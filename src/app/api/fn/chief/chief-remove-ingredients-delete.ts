/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FoodIngredient } from '../../models/food-ingredient';

export interface ChiefRemoveIngredientsDelete$Params {
  ingredient?: FoodIngredient;
}

export function chiefRemoveIngredientsDelete(http: HttpClient, rootUrl: string, params?: ChiefRemoveIngredientsDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<boolean>>> {
  const rb = new RequestBuilder(rootUrl, chiefRemoveIngredientsDelete.PATH, 'delete');
  if (params) {
    rb.query('ingredient', params.ingredient, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<boolean>>;
    })
  );
}

chiefRemoveIngredientsDelete.PATH = '/Chief/RemoveIngredients';
