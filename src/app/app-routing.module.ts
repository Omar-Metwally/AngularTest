import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './play/play.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [
      { path: 'play', component: PlayComponent },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) },
    ]
  },
  // Implanting lazy loading by the following format
  { path: 'about-us', loadComponent: () => import('./about-us/about-us.component').then(module => module.AboutUsComponent ) },
  { path: 'menu', loadComponent: () => import('./menu/menu.component').then(module => module.MenuComponent ) },
  { path: 'become-a-chief', loadComponent: () => import('./account/chief-signup/chief-signup.component').then(module => module.ChiefSignupComponent ) },
  { path: 'test', loadComponent: () => import('./account/chief-register/chief-register.component').then(module => module.ChiefRegisterComponent ) },
  { path: 'meal/add-meal/:mealID', loadComponent: () => import('./meal/add-meal/add-meal.component').then(module => module.AddMealComponent ) },
  { path: 'meal/add-meal', loadComponent: () => import('./meal/add-meal/add-meal.component').then(module => module.AddMealComponent ) },
  { path: 'cart', loadComponent: () => import('./cart/cart.component').then(module => module.CartComponent ) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(module => module.ProfileComponent) },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
