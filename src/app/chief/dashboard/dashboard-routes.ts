import { Routes } from "@angular/router";

export const ChiefDashBoardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent)
  },
]