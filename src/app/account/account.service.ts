import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerSignUp } from '../shared/models/account/customerSignup';
import { Login } from '../shared/models/account/login';
import { User } from '../shared/models/account/user';
import { Observable, ReplaySubject, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../shared/models/account/confirmEmail';
import { ResetPassword } from '../shared/models/account/resetPassword';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable()

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

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

  isUserLoggedIn(): boolean{
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
      return of(undefined);
    }
  
    return this.http.get<User>(`${environment.appUrl}Auth/refreshToken`, { withCredentials: true }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  login(model: Login) {
    let headers = new HttpHeaders();
    headers.append('withCredentials', 'true' );
    const options = {
      withCredentials: true
    };
    return this.http.post<User>(`${environment.appUrl}Auth/Login`,  model , options  )
    .pipe(
      map((user: User) => {
        if (user) {
          let decodedJWT: any = jwtDecode(user.jwt);
          user.firstName =  decodedJWT.given_name,
          user.lastName = decodedJWT.family_name,
          user.username = decodedJWT.unique_name,
          this.setUser(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
    
    return this.http.get(`${environment.appUrl}Auth/RevokeToken`, { withCredentials: true })
    .subscribe();
  }

  register(model: CustomerSignUp) {
    return this.http.post(`${environment.appUrl}Auth/CustomerSignUp`, model);
  }

  checkEmail(email: AbstractControl){
    return this.http.post<boolean>(`${environment.appUrl}Auth/CheckEmail`,{email: email.value.toLowerCase()});
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
  
}

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private accountService: AccountService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.accountService.checkEmail(control).pipe(
      map((isTaken) => (isTaken ? null : { uniqueEmail: true })),
      catchError(() => of(null)),
    );
  }
}