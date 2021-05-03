import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ('@final/pages/home/module.page.home').then(m => m.ModulePageHome)
  },
  {
    path: 'auth',
    loadChildren: () => import ('@final/pages/login/module.page.login').then(m => m.ModulePageLogin)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule { }
