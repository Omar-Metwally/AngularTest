/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChiefProfileDataRequest } from '../../models/get-chief-profile-data-request';

export interface ChiefGetChiefProfileDataGet$Params {
}

export function chiefGetChiefProfileDataGet(http: HttpClient, rootUrl: string, params?: ChiefGetChiefProfileDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefProfileDataRequest>> {
  const rb = new RequestBuilder(rootUrl, chiefGetChiefProfileDataGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetChiefProfileDataRequest>;
    })
  );
}

chiefGetChiefProfileDataGet.PATH = '/Chief/GetChiefProfileData';
