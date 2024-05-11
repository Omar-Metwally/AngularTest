/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChiefMealsRequest } from '../../models/get-chief-meals-request';

export interface ChiefGetChiefMealsGet$Plain$Params {
  ChiefID?: string;
}

export function chiefGetChiefMealsGet$Plain(http: HttpClient, rootUrl: string, params?: ChiefGetChiefMealsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefMealsRequest>> {
  const rb = new RequestBuilder(rootUrl, chiefGetChiefMealsGet$Plain.PATH, 'get');
  if (params) {
    rb.query('ChiefID', params.ChiefID, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetChiefMealsRequest>;
    })
  );
}

chiefGetChiefMealsGet$Plain.PATH = '/Chief/GetChiefMeals';
