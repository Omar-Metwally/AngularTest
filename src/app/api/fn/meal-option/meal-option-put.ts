/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface MealOptionPut$Params {
      body?: {
'MealOptionID'?: string;
'IsAvailable'?: boolean;
'Price'?: number;
'AvailableQuantity'?: number;
'SaveQuantitySetting'?: boolean;
'Image'?: Blob;
}
}

export function mealOptionPut(http: HttpClient, rootUrl: string, params?: MealOptionPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, mealOptionPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

mealOptionPut.PATH = '/MealOption';
