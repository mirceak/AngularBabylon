import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import ('@custom/components/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "register",
    loadChildren: () => import ('@custom/components/pages/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLoginRoutingModule { }
