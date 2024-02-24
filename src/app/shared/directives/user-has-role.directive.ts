import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import jwt_decode from 'jwt-decode';

@Directive({
  selector: '[appUserHasRole]'
})
export class UserHasRoleDirective implements OnInit{
  @Input() appUserHasRole: string[] = [];

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService) { }


  ngOnInit(): void {
    this.accountService.user$.pipe((take(1))).subscribe({
      next: user => {
        if (user) {
          const decodedToken: any = jwt_decode(user.jwt);
          this.appUserHasRole.includes(decodedToken.roles)
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }
    })
  }

}
