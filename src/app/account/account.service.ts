import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerSignUp } from '../shared/models/account/customerSignup';
import { Login } from '../shared/models/account/login';
import { User } from '../shared/models/account/user';
import { BehaviorSubject, Observable, ReplaySubject, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../shared/models/account/confirmEmail';
import { ResetPassword } from '../shared/models/account/resetPassword';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors, Validator } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CartService } from '../api/services';
import { Cart } from '../api/models/cart'
import { CartPost$Params, cartPost } from '../api/fn/cart/cart-post';
import { CartCartResult, UpsertCartRequest } from '../api/models';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  private cartSource = new ReplaySubject<Cart[]>(1);
  user$ = this.userSource.asObservable()
  cart$ = this.cartSource.asObservable()

  constructor(private http: HttpClient, private router: Router,
    private cartService: CartService) { }

  /*refreshUser(jwt: string) {
    let decodedJWT = jwtDecode(jwt)
    let expireDate = decodedJWT.exp
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }
    return this.http.get<User>(`${environment.appUrl}Auth/refreshToken`, { withCredentials: true }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }*/

  isUserLoggedIn(): boolean {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      return true;
    } else {
      return false;
    }
  }


  refreshUser(jwt: string | null) {
    if (!jwt) {
      this.userSource.next(null);
      this.setCart()

      return of(undefined);
    }
    let decodedJWT: any = jwtDecode(jwt);
    let expireDate = decodedJWT.exp;
    let currentDateInSeconds = Math.floor(Date.now() / 1000);

    if (expireDate && expireDate > currentDateInSeconds) {
      let user: User = {
        firstName: decodedJWT.given_name,
        lastName: decodedJWT.family_name,
        username: decodedJWT.unique_name,
        jwt: jwt
      };

      this.setUser(user);
      this.setCart()

      return of(undefined);
    }

    return this.http.get<User>(`${environment.appUrl}Auth/refreshToken`, { withCredentials: true }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
          this.addItemToCart();
        }
      })
    );
  }

  login(model: Login) {
    const options = {
      withCredentials: true
    };
    return this.http.post<User>(`${environment.appUrl}Auth/Login`, model, options)
      .pipe(
        map((user: User) => {
          if (user) {
            let decodedJWT: any = jwtDecode(user.jwt);
            user.firstName = decodedJWT.given_name,
              user.lastName = decodedJWT.family_name,
              user.username = decodedJWT.unique_name,
              this.setUser(user);
            this.addItemToCart();
          }
        })
      );
  }

  // addItemToCart(cartItem: Cart){
  //   let cart = this.cartSource.value ?? [];
  //   cart = this.addOrUpdateCartItem(cart,cartItem)
  //   this.setCartItems(cartItem)
  //   this.cartSource.next(cart);
  //   localStorage.setItem('cart',JSON.stringify(cart))
  // }

  getCartItems(cartPost$Params: CartPost$Params) {
    return this.cartService.cartPost(cartPost$Params)
      .pipe(
        map((cart: Cart[]) => {
          this.cartSource.next(cart);
        })
      );
  }

  setCart() {
    let cartItemsString = localStorage.getItem('cart')
    let cartItems: Cart[] = []
    if (cartItemsString) {
      cartItems = JSON.parse(cartItemsString)
    }
    this.cartSource.next(cartItems)
  }

  addOrUpdateCartItem(cart: Cart[], cartItemToAdd: Cart): Cart[] {
    const index = cart.findIndex(x => x.mealOptionID === cartItemToAdd.mealOptionID)
    if (index === -1) {
      cart.push(cartItemToAdd);
    }
    else {
      cart[index].quantity = cart[index].quantity + cartItemToAdd.quantity
    }
    return cart
  }

  setCartItems(cartItem: Cart) {
    const upsertCartRequest: UpsertCartRequest[] = [{ mealOptionID: cartItem.mealOptionID, quantity: cartItem.quantity, timeOfDelivery: cartItem.timeOfDelivery }]
    const cartGetParams: CartPost$Params = {
      body: upsertCartRequest
    }
    console.log(cartGetParams)
    return this.cartService.cartPost(cartGetParams).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    });
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    localStorage.removeItem('cart');
    this.userSource.next(null);
    this.cartSource.closed
    this.router.navigateByUrl('/');

    return this.http.get(`${environment.appUrl}Auth/RevokeToken`, { withCredentials: true })
      .subscribe();
  }

  register(model: CustomerSignUp) {
    return this.http.post(`${environment.appUrl}Auth/CustomerSignUp`, model);
  }

  checkEmail(email: AbstractControl) {
    return this.http.post<boolean>(`${environment.appUrl}Auth/CheckEmail`, { email: email.value.toLowerCase() });
  }

  confirmEmail(model: ConfirmEmail) {
    return this.http.put(`${environment.appUrl}account/confirm-email`, model);
  }

  resendEmailConfirmationLink(email: string) {
    return this.http.post(`${environment.appUrl}account/resend-email-confirmation-link/${email}`, {});
  }

  forgotUsernameOrPassword(email: string) {
    return this.http.post(`${environment.appUrl}account/forgot-username-or-password/${email}`, {});
  }

  resetPassword(model: ResetPassword) {
    return this.http.put(`${environment.appUrl}account/reset-password`, model);
  }

  getJWT() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);
      return user.jwt;
    } else {
      return null;
    }
  }

  getUser() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);
      return user;
    }
    return this.user$;
  }


  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }

  async addItemToCart(cartItem?: Cart) {
    let cartItems: Cart[] = []
    if (cartItem) {
      cartItems = this.addOrUpdateCart(cartItem)
    }
    if (this.isUserLoggedIn()) {
      cartItems = await this.updateCartItemsFromAPI(cartItems) ?? cartItems
      this.cartSource.next(cartItems)
    }
    else {
      this.cartSource.next(cartItems)
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  addOrUpdateCart(cartItem: Cart) {
    let cartItems: Cart[] = this.getCart();

    const index = cartItems.findIndex(x => x.mealOptionID === cartItem.mealOptionID)
    if (index === -1) {
      cartItems.push(cartItem);
    }
    else {
      cartItems[index].quantity = cartItems[index].quantity + cartItem.quantity
    }
    return cartItems
  }

  getCart() {
    const key = localStorage.getItem('cart');
    if (key) {
      const cart: Cart[] = JSON.parse(key);
      return cart;
    }
    const cart: Cart[] = []
    localStorage.setItem('cart', JSON.stringify(cart))
    this.cartSource.next(cart)
    return cart
  }

  updateCartItemsFromAPI(cartItems?: Cart[]): Promise<Cart[] | undefined> {
    return new Promise((resolve, reject) => {
      if (cartItems) {
        const upsertCartRequest: UpsertCartRequest[] = []

        for (const cartItem of cartItems) {
          const upsertRequest: UpsertCartRequest = {
            mealOptionID: cartItem.mealOptionID,
            quantity: cartItem.quantity,
            timeOfDelivery: cartItem.timeOfDelivery
          };
          upsertCartRequest.push(upsertRequest);
        }
        const cartPost$Params: CartPost$Params = { body: upsertCartRequest }

        this.cartService.cartPost$Response(cartPost$Params).subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.status === 200) {
              cartItems = response.body as Cart[]
            } else if (response.status === 202) {
              cartItems = response.body.data as Cart[]
            }
            console.log(cartItems, 'from api call')
            resolve(cartItems)
          },
          error: error => {
            reject(error)
          }
        })

      }
      else {
        this.cartService.cartPost$Response().subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.status === 200) {
              cartItems = response.body as Cart[]
            } else if (response.status === 202) {
              cartItems = response.body.data as Cart[]
            }
            resolve(cartItems)
          },
          error: error => {
            reject(error)
          }
        })
      }
    })
  }


  // updateCartItemsFromAPI(cartItems?: Cart[]):Promise<Cart[] | undefined> {
  //   if (cartItems) {
  //     const upsertCartRequest: UpsertCartRequest[] = []

  //     for (const cartItem of cartItems) {
  //       const upsertRequest: UpsertCartRequest = {
  //         mealOptionID: cartItem.mealOptionID,
  //         quantity: cartItem.quantity,
  //         timeOfDelivery: cartItem.timeOfDelivery
  //       };
  //       upsertCartRequest.push(upsertRequest);
  //     }
  //     const cartPost$Params: CartPost$Params = { body: upsertCartRequest }

  //     this.cartService.cartPost$Response(cartPost$Params).subscribe({
  //       next: (response: HttpResponse<any>) => {
  //         if (response.status === 200) {
  //           cartItems = response.body as Cart[]
  //           // Handle 200 status code response
  //         } else if (response.status === 202) {
  //           cartItems = response.body.data as Cart[]
  //         }
  //         console.log(cartItems, 'from api call')
  //         return cartItems
  //       },
  //       error: error => {
  //         // Handle error
  //       }
  //     })

  //   }
  //   else {
  //     this.cartService.cartPost$Plain$Response().subscribe({
  //       next: (response: HttpResponse<any>) => {
  //         if (response.status === 200) {
  //           // Handle 200 status code response
  //           cartItems = response.body as Cart[]
  //         } else if (response.status === 202) {
  //           console.log(response.body.errors as string[])
  //           console.log(response.body.errors as string[])
  //           cartItems = response.body.data as Cart[]
  //         }
  //       },
  //       error: error => {
  //         // Handle error
  //       }
  //     })
  //   }
  //   return Promise<cartItems | undefined>
  // }
}

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private accountService: AccountService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.accountService.checkEmail(control).pipe(
      map((isTaken) => (isTaken ? null : { uniqueEmail: true })),
      catchError(() => of(null)),
    );
  }
}
@Injectable({ providedIn: 'root' })
export class PhoneValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const validAreaCodes = ['010', '011', '012', '015'];
    const inputValue = control.value;

    if (inputValue.length < 3) {
      return null
    }
    const areaCode = inputValue.substring(0, 3);
    return validAreaCodes.indexOf(areaCode) === -1 ? { phone: true } : null;
  }
}

@Injectable({ providedIn: 'root' })
export class NationalIDValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const inputValue = control.value as string;
    if (inputValue.length !== 14) {
      return { 'nationalID': 'invalid national id number' };
    }

    const yearsDigits = parseInt(inputValue.slice(0, 3), 10);
    if (yearsDigits < 250 || yearsDigits > 302) {
      return { 'nationalID': 'you must be born between 1950 and 2002' };
    }

    const nextTwoDigits = parseInt(inputValue.slice(3, 5), 10);
    if (nextTwoDigits < 1 || nextTwoDigits > 12) {
      return { 'nationalID': 'invalid month' };
    }

    const nextTwoDigitsAfterMonth = parseInt(inputValue.slice(5, 7), 10);
    if (nextTwoDigitsAfterMonth < 1 || nextTwoDigitsAfterMonth > 31) {
      return { 'nationalID': 'invalid day' };
    }

    const nextTwoDigitsAfterDay = parseInt(inputValue.slice(7, 9), 10);
    if (nextTwoDigitsAfterDay < 1 || nextTwoDigitsAfterDay > 35) {
      return { 'nationalID': 'invalid governorate number' };
    }

    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class StartTimeValidator implements Validator {
  private startTime: NgbTimeStruct = {hour: 6, minute: 0 , second: 0};

  setStartTime(startTime: NgbTimeStruct) {
    this.startTime = startTime;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(this.startTime)
    if (control.value.hour < this.startTime.hour || control.value.hour == this.startTime.hour && control.value.minute <= this.startTime.minute ) {
      return { startTimeInvalid: `you cannot be early than ${this.startTime.hour} : ${this.startTime.minute}` };
    }
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class EndTimeValidator implements Validator {
  private endTime: NgbTimeStruct = {hour: 23, minute: 0 , second: 0};

  setEndTime(endTime: NgbTimeStruct) {
    this.endTime = endTime;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(this.endTime)
    if (control.value.hour > this.endTime.hour || control.value.hour == this.endTime.hour && control.value.minute >= this.endTime.minute ) {
      return { endTimeInvalid: `you cannot be late than ${this.endTime.hour} : ${this.endTime.minute}` };
    }
    return null;
  }
}
