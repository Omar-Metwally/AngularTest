/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetSideDishOptionRequest } from '../../models/get-side-dish-option-request';

export interface SideDishOptionChiefIdGet$Plain$Params {
  ChiefID: string;
}

export function sideDishOptionChiefIdGet$Plain(http: HttpClient, rootUrl: string, params: SideDishOptionChiefIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetSideDishOptionRequest>>> {
  const rb = new RequestBuilder(rootUrl, sideDishOptionChiefIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('ChiefID', params.ChiefID, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetSideDishOptionRequest>>;
    })
  );
}

sideDishOptionChiefIdGet$Plain.PATH = '/SideDishOption/{ChiefID}';