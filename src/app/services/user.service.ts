import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegister } from '../models/IRegister';
import { IUser } from '../models/IUser';
import { CartItemsService } from './cart-items.service';
import { CartsService } from './carts.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cartService: CartsService, private cartItemsService: CartItemsService ) {
    //TODO: sessionStorage login
   }

  public currentUser?: IUser;
  public isNewUser?: boolean = false;

  login = (userName: string, password: string) : void => {
    this.http.post<any>("http://localhost:3001/users/login", {email: userName, password}).subscribe((loginResponse) => {
      this.currentUser = {
        token: loginResponse.token,
        firstName: loginResponse.firstName,
        lastName: loginResponse.lastName,
        city: loginResponse.city,
        street: loginResponse.street
      };
      if (loginResponse.userCart){
        this.cartService.cart = loginResponse.userCart;
      }
      else {
        this.isNewUser = true;
        this.cartService.openCart();
      }
      
      sessionStorage.setItem("userData", JSON.stringify(this.currentUser));
    },(e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }

  register = (userRequest: IRegister) : void => {
    this.http.post('http://localhost:3001/users/', userRequest).subscribe((registerResponse) => {
      alert("Register successful")
    },(e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }
}
