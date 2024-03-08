/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetSideDishRequest } from '../../models/get-side-dish-request';

export interface SideDishGet$Plain$Params {
  ChiefID: string;
}

export function sideDishGet$Plain(http: HttpClient, rootUrl: string, params: SideDishGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetSideDishRequest>>> {
  const rb = new RequestBuilder(rootUrl, sideDishGet$Plain.PATH, 'get');
  if (params) {
    rb.path('ChiefID', params.ChiefID, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetSideDishRequest>>;
    })
  );
}

sideDishGet$Plain.PATH = '/SideDish';
