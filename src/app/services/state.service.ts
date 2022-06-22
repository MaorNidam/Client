import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { CartItemsService } from './cart-items.service';
import { CartsService } from './carts.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public usersService: UserService,
    public cartsService: CartsService,
    public cartItemsService: CartItemsService,
  ) {
    this.usersService.followCurrentUser().subscribe((newUser) => {
      if (newUser) {
        this.cartsService.getLastCart();
        this.ordersService.getLastOrderDate();
      }
      else {
        this.cartsService.setCart(null);
        this.ordersService.lastOrderDate = null;
      }
    });

    this.cartsService.followCartSubject().subscribe((newCart) => {
      if (newCart) {
        this.cartItemsService.getCartItems(newCart.id);
      }
      else {
        this.cartItemsService.cartItems = [];
      }
    })
   }


}
