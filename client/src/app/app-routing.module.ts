import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import ('@final/pages/home/page.home.module').then(m => m.PageHomeModule)
  },
  {
    path: "login",
    loadChildren: () => import ('@final/pages/login/page.login.module').then(m => m.PageLoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
