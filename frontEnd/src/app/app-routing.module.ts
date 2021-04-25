import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ('@final/pages/home/page.home.module').then(m => m.PageHomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import ('@final/pages/login/page.login.module').then(m => m.PageLoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
