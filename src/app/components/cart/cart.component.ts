import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/models/ICartItems';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(
    public cartItemsService: CartItemsService,
    public cartsService: CartsService,
    public router: Router
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.cartItemsService.followCartItemsSubject().subscribe((newItems) => {
      if (newItems){
        this.cartItems = newItems;
      }
    })
  }

  @Input() isOrder: boolean;
  isModalShown: boolean = false;
  cartItemToEdit: ICartItem;
  cartItems: ICartItem[] = [];
  subscription : Subscription;

  handleDelete = (cartItemId: number) => {
    let cartId = this.cartsService.getCart().id;
    this.cartItemsService.deleteCartItem(cartItemId, cartId);
  }

  handleEdit = (cartItem: ICartItem) => {
    this.isModalShown = true;
    this.cartItemToEdit = cartItem;
  }

  handleClearCart = () => {
    let cartId = this.cartsService.getCart().id;
    this.cartItemsService.deleteAllItemsFromCart(cartId);
  }

  handlePayment = () => {
    this.router.navigate(['order']);
  }
}
