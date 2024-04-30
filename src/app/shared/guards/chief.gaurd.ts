import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { SharedService } from '../shared.service';
import { User } from '../models/account/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ChiefGuard {

  constructor(private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {

        if (user) {
          const decodedToken: any = jwt_decode(user.jwt);
          if (decodedToken.roles.includes('Chief')) {
            return true;
          }
        }

        this.sharedService.showPopUp('danger', 'Chief Area');
        this.router.navigateByUrl('/');

        return false;
      })
    );
  }

}