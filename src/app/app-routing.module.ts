import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './play/play.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './chief/dashboard/dashboard.component';
import { AddMealComponent } from './meal/add-meal/add-meal.component';
import { AddSideDishComponent } from './side-dish/add-side-dish/add-side-dish.component';

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
  { path: 'meal/add/:mealID', loadComponent: () => import('./meal/add-meal/add-meal.component').then(module => module.AddMealComponent ) , outlet: "chief-dashboard"},
  { path: 'dashboard/meal/add', loadComponent: () => import('./meal/add-meal/add-meal.component').then(module => module.AddMealComponent ) , outlet: "chief-dashboard"},
  { path: 'side-dish/add/:sideDishID', loadComponent: () => import('./side-dish/add-side-dish/add-side-dish.component').then(module => module.AddSideDishComponent ) },
  { path: 'side-dish/add', loadComponent: () => import('./side-dish/add-side-dish/add-side-dish.component').then(module => module.AddSideDishComponent ) },
  { path: 'cart', loadComponent: () => import('./cart/cart.component').then(module => module.CartComponent ) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(module => module.ProfileComponent) },
  //{ path: 'dashboard', loadComponent: () => import('./chief/dashboard/dashboard.component').then(module => module.DashboardComponent) },
  { path: 'test', loadComponent: () => import('./test/test.component').then(module => module.TestComponent) },
  { path: 'meal/:mealID', loadComponent: () => import('./meal/meal.component').then(module => module.MealComponent) },
  { path: 'meal', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'dashboard' , component: DashboardComponent,children:[
    {path:'meal-add', component: AddMealComponent},
    {path:'side-dish-add', component: AddSideDishComponent},
  ]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
