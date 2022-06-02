import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartItem } from '../models/ICartItems';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3001/cart-items/'
  cartItems: ICartItem[] = [];

  getCartItems = (cartId) => {
    this.http.get<ICartItem[]>(this.baseUrl + cartId).subscribe((cartItemsResponse) => {
      this.cartItems = cartItemsResponse;
    }, (e) => {
      alert("Something went wrong");
      console.log(e);
      
    })
  }

  addCartItem = (cartItem) => {
    this.http.post(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      this.getCartItems(cartItem.cartId);
    }, (e) => {
      alert("Something went wrong");
      console.log(e);
      
    })
  }

  updateCartItem = (cartItem) => {
    this.http.put(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      this.getCartItems(cartItem.cartId);
    }, (e) => {
      alert("Something went wrong");
      console.log(e);
      
    })
  }

  deleteCartItem = (cartItemId, cartId) => {
    this.http.delete(this.baseUrl + cartItemId).subscribe((cartItemsResponse) => {
      this.getCartItems(cartId);
    }, (e) => {
      alert("Something went wrong");
      console.log(e);
      
    })
  }

  deleteAllItemsFromCart = (cartId) => {
    this.http.delete(this.baseUrl +"by-cart/"+ cartId).subscribe((cartItemsResponse) => {
      this.getCartItems(cartId);
    }, (e) => {
      alert("Something went wrong");
      console.log(e);
      
    })
  }
}
