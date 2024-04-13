/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { AddressService } from './services/address.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ChiefService } from './services/chief.service';
import { ImageService } from './services/image.service';
import { MealOptionService } from './services/meal-option.service';
import { MealReviewService } from './services/meal-review.service';
import { MealsService } from './services/meals.service';
import { OrderService } from './services/order.service';
import { PromoCodeService } from './services/promo-code.service';
import { SideDishService } from './services/side-dish.service';
import { SideDishOptionService } from './services/side-dish-option.service';
import { SubscriptionService } from './services/subscription.service';
import { SubscriptionDayDataService } from './services/subscription-day-data.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AddressService,
    AuthService,
    CartService,
    ChiefService,
    ImageService,
    MealOptionService,
    MealReviewService,
    MealsService,
    OrderService,
    PromoCodeService,
    SideDishService,
    SideDishOptionService,
    SubscriptionService,
    SubscriptionDayDataService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
