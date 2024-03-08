/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetSideDishRequest } from '../../models/get-side-dish-request';

export interface SideDishSideDishIdGet$Plain$Params {
  SideDishID: string;
}

export function sideDishSideDishIdGet$Plain(http: HttpClient, rootUrl: string, params: SideDishSideDishIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSideDishRequest>> {
  const rb = new RequestBuilder(rootUrl, sideDishSideDishIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('SideDishID', params.SideDishID, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetSideDishRequest>;
    })
  );
}

sideDishSideDishIdGet$Plain.PATH = '/SideDish/{SideDishID}';
