import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ICartItem } from 'src/app/models/ICartItems';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { IServerCartItem } from 'src/app/models/IServerCartItem';
import { CartsService } from 'src/app/services/carts.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-cart-item-modal',
  templateUrl: './add-cart-item-modal.component.html',
  styleUrls: ['./add-cart-item-modal.component.css']
})

export class AddCartItemModalComponent implements OnInit, OnDestroy {

  constructor(
    public cartItemsService: CartItemsService,
    public cartsService: CartsService,
    public messageService: MessageService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.cartItemsService.followCartItemsSubject().subscribe((newItems) => {
      this.cartItems = newItems;
    });

    if (this.cartItemToEdit) {
      this.amountToAdd = this.cartItemToEdit.quantity;
      this.isEdit = true;
    }
    if (this.productToAdd) {
      this.cartItemToEdit = this.cartItems.find((cartItem) => { return cartItem.productId == this.productToAdd.id });
      if (!this.cartItemToEdit) {
        this.convertProductToCartItem();
      }
      else {
        this.amountToAdd = this.cartItemToEdit.quantity;
        this.isEdit = true;
      }
    }
  }

  @Input() isModalShown: Boolean = false;
  @Output() isModalShownChange = new EventEmitter();
  @Input() productToAdd: IProduct;
  @Input() cartItemToEdit: ICartItem;
  amountToAdd = 0;
  cartItems: ICartItem[] = [];
  subscription : Subscription;

  isEdit: boolean = false;
  private serverCartItem: IServerCartItem;

  handleModalHide = () => {
    this.isModalShown = false;
    this.isModalShownChange.emit(this.isModalShown);
  }

  handleAddButton = () => {
    this.serverCartItem = {
      cartId: this.cartsService.getCart().id,
      quantity: this.amountToAdd,
      productId: this.cartItemToEdit.productId,
      id: this.cartItemToEdit.id
    }
    if (this.cartItemToEdit.quantity == this.amountToAdd) {
      this.handleModalHide();
      return;
    }
    if (this.isEdit) {
      if (this.serverCartItem.quantity == 0) {
        this.cartItemsService.deleteCartItem(this.serverCartItem.id, this.serverCartItem.cartId);
      }
      else {
        this.cartItemsService.updateCartItem(this.serverCartItem);
      }
    }
    else {
      if (this.serverCartItem.quantity == 0) {
        this.messageService.add({ key: 'appToast', severity: 'alert', summary: 'Amount', detail: 'No amount was choosen.' });
      }
      else {
        this.cartItemsService.addCartItem(this.serverCartItem);
      }
    }
    this.handleModalHide();
  }

  convertProductToCartItem = () => {
    this.cartItemToEdit = {
      id: null,
      productId: this.productToAdd.id,
      productName: this.productToAdd.name,
      price: this.productToAdd.price,
      quantity: 0,
      productImg: this.productToAdd.imgUrl
    }
  }
}
