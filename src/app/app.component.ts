import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { SharedService } from './shared/shared.service';
import { CartPost$Params } from './api/fn/cart/cart-post';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService,
    private sharedService: SharedService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        "ingredient",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/svg images/ingredient.svg")
      );
     }

  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.accountService.getJWT();
    if (!jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: _ => { },
        error: error => {
          this.accountService.logout();
          if (error.status === 401) {
            this.sharedService.showNotification(false, 'Account blocked', error.error);
          }
        }
      })
    }
    else {
      this.accountService.refreshUser(jwt).subscribe();
      // this.accountService.addItemToCart();
    }
  }
}
