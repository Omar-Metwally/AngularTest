/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FoodIngredient } from '../../models/food-ingredient';

export interface ChiefRemoveIngredientsDelete$Plain$Params {
  ingredient?: FoodIngredient;
}

export function chiefRemoveIngredientsDelete$Plain(http: HttpClient, rootUrl: string, params?: ChiefRemoveIngredientsDelete$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<boolean>>> {
  const rb = new RequestBuilder(rootUrl, chiefRemoveIngredientsDelete$Plain.PATH, 'delete');
  if (params) {
    rb.query('ingredient', params.ingredient, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<boolean>>;
    })
  );
}

chiefRemoveIngredientsDelete$Plain.PATH = '/Chief/RemoveIngredients';
