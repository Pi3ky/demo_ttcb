import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HomePagesComponent } from './home-pages/home-pages.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePagesComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'account',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
