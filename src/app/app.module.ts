import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { PlayComponent } from './play/play.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component';
import { SelectInputComponent } from "./shared/select-input/select-input.component";
import { ChiefSignupComponent } from './account/chief-signup/chief-signup.component';
import { AddMealComponent } from './meal/add-meal/add-meal.component';
import { SideNavComponent } from './chief/dashboard/side-nav/side-nav.component';
import { ProfileComponent } from './chief/dashboard/profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { MealComponent } from './meal/meal.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        //HomeComponent,
        PlayComponent,
    ],
    providers: [ importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,  }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        NavbarComponent,
        NgbModule,
        HomeComponent,
        AboutUsComponent,
        SelectInputComponent,
        ChiefSignupComponent,
        AddMealComponent,
        SideNavComponent,
        ProfileComponent,
        MenuComponent,
        MealComponent,
    ]
})
export class AppModule { }
