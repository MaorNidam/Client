import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/models/ICartItems';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public cartItemsService: CartItemsService,
    public cartsService: CartsService
  ) { }

  ngOnInit(): void {
  }

  handleDelete = (cartItemId: number) => {
    let cartId = this.cartsService.getCart().id;
    this.cartItemsService.deleteCartItem(cartItemId, cartId);
  }

  handleEdit = (cartItem: ICartItem) => {

  }

  handleClearCart = () => {
    let cartId = this.cartsService.getCart().id;
    this.cartItemsService.deleteAllItemsFromCart(cartId);
  }

  handlePayment = () => {
    
  }
}
