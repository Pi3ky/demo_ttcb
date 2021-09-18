import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePagesComponent } from './home-pages/home-pages.component';
import { PublicModule } from '../components/public.modules';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
@NgModule({
  declarations: [
    HomePagesComponent,
    ShoppingCartComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    PublicModule,
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
    NgSelectModule,
    ModalModule.forRoot(),
    PagesRoutingModule,
    NgxStarRatingModule
  ]
})
export class PagesModule { }
