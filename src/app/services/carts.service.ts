import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../models/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  cart: ICart;

  getLastCart = (): void => {
    this.http.get<ICart>('http://localhost:3001/carts').subscribe((cartResponse) => {
        this.cart = {
          id: cartResponse.id,
          creationDate: cartResponse.creationDate,
          isOpen: cartResponse.isOpen
        }
    }, (e) => {
      alert("Something went wrong.");
      console.log(e);

    })
  }

  openCart = (): void => {
    this.http.post<number>('http://localhost:3001/carts', {}).subscribe((cartId) => {
      this.cart = {
        id: cartId,
        creationDate: new Date(),
        isOpen: true
      }
    }, (e) => {
      alert("Something went wrong!");
      console.log(e);

    })
  }
}
