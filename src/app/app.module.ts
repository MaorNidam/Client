import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './Interceptors/AuthenticationInterceptor';
import { StartingPageComponent } from './components/starting-page/starting-page.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { OrderComponent } from './components/order/order.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RegisterPersonalInfoComponent } from './components/register-personal-info/register-personal-info.component';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartingPageComponent,
    RegisterComponent,
    StoreComponent,
    OrderComponent,
    HeaderComponent,
    RegisterAccountComponent,
    RegisterPersonalInfoComponent
  ],
  imports: [
    BrowserModule,
    RippleModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    BrowserAnimationsModule,
    StepsModule,
    DropdownModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
