import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalViewProductComponent } from './modal-view-product/modal-view-product.component';
import { ModalAddCartComponent } from './modal-add-cart/modal-add-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoDataComponent } from './no-data/no-data.component';
import { NgSelectModule } from '@ng-select/ng-select';


const MODULES = [
  CarouselModule.forRoot(),
  NgxSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
];

const ENTRIES = [ModalViewProductComponent, ModalAddCartComponent,]

@NgModule({
  declarations: [
    ModalViewProductComponent,
    ModalAddCartComponent,
    NoDataComponent,
  ],
  imports: [CommonModule, ...MODULES],
  exports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NoDataComponent,
  ],
  entryComponents: [...ENTRIES],
})
export class PublicModule {
  // static forRoot(): ModuleWithProviders<any> {
  //   return <ModuleWithProviders<any>>{
  //     ngModule: PublicModule,
  //     providers: [
  //     ],
  //   };
  // }
}
