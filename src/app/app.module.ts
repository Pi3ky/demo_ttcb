import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './login/login.component';
import { PublicModule } from './components/public.modules';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AlertComponent } from './components';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    PublicModule,
    CommonModule,
    NgxSpinnerModule,
    HttpClientModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
