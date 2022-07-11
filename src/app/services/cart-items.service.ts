import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICartItem } from '../models/ICartItems';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  baseUrl = 'http://localhost:3001/cart-items/'
  private cartItems: ICartItem[];
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>(null);
  totalPrice: number = 0;

  getCartItems = (cartId) => {
    this.totalPrice = 0;
    this.http.get<ICartItem[]>(this.baseUrl + cartId).subscribe((cartItemsResponse) => {
      this.cartItems = cartItemsResponse;
      for (let item of this.cartItems) {
        this.totalPrice += item.price * item.quantity;
      }
      this.cartItemsSubject.next(this.cartItems);
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);

    })
  }

  addCartItem = (cartItem) => {
    this.http.post(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      this.getCartItems(cartItem.cartId);
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);

    })
  }

  updateCartItem = (cartItem) => {
    this.http.put(this.baseUrl, cartItem).subscribe((cartItemsResponse) => {
      this.getCartItems(cartItem.cartId);
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);

    })
  }

  deleteCartItem = (cartItemId, cartId) => {
    this.http.delete(this.baseUrl + cartItemId).subscribe((cartItemsResponse) => {
      this.getCartItems(cartId);
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);

    })
  }

  deleteAllItemsFromCart = (cartId) => {
    this.http.delete(this.baseUrl + "by-cart/" + cartId).subscribe((cartItemsResponse) => {
      this.getCartItems(cartId);
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);

    })
  }

  followCartItemsSubject = () : Observable<ICartItem[]> => {
    return this.cartItemsSubject.asObservable();
  }

  setCartItems = (cartItems: ICartItem[]) => {
    this.cartItemsSubject.next(cartItems);
  }
}
