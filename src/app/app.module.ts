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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RegisterPersonalInfoComponent } from './components/register-personal-info/register-personal-info.component';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import { AddCartItemModalComponent } from './components/add-cart-item-modal/add-cart-item-modal.component';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { AddOrEditProductComponent } from './components/add-or-edit-product/add-or-edit-product.component';
import { MessageService } from 'primeng/api';
import { UserService } from './services/user.service';
import { MarkerPipe } from './pipes/marker.pipe';




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
    RegisterPersonalInfoComponent,
    CartComponent,
    ProductsComponent,
    AddCartItemModalComponent,
    AddOrEditProductComponent,
    MarkerPipe
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
    DropdownModule,
    DataViewModule,
    TabViewModule,
    DialogModule,
    InputNumberModule,
    InputMaskModule,
    CalendarModule,
    MessagesModule,
    ToastModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
