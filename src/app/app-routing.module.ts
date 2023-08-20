import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout';
import { AppRouteEnum } from '@core';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRouteEnum.Home,
        loadChildren: () => import('@pages/home')
          .then((m) => m.HomeModule)
      },
      {
        path: AppRouteEnum.Repos,
        loadChildren: () => import('@pages/repos')
          .then((m) => m.ReposModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
