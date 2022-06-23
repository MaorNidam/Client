import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../models/ICart';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) {

  }

  private cart: ICart;
  private cartSubject = new BehaviorSubject<ICart>(null);

  getLastCart = async (): Promise<void> => {
    this.http.get<ICart>('http://localhost:3001/carts').subscribe((cartResponse) => {
      if (cartResponse) {
        this.cart = {
          id: cartResponse.id,
          creationDate: cartResponse.creationDate,
          isOpen: cartResponse.isOpen
        };
        this.cartSubject.next(this.cart);
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
      this.cartSubject.next(this.cart);
    }, (e) => {
      alert("Something went wrong!");
      console.log(e);

    })
  }

  followCartSubject = (): Observable<ICart> => {
    return this.cartSubject.asObservable();
  }

  setCart = (newCart: ICart) => {
    this.cartSubject.next(newCart);
  }

  getCart = () : ICart => {
    return this.cartSubject.value;
  }
}
