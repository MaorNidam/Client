import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ICartItem } from 'src/app/models/ICartItems';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { IServerCartItem } from 'src/app/models/IServerCartItem';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-add-cart-item-modal',
  templateUrl: './add-cart-item-modal.component.html',
  styleUrls: ['./add-cart-item-modal.component.css']
})

export class AddCartItemModalComponent implements OnInit {

  constructor(
    public cartItemsService: CartItemsService,
    public cartsService: CartsService
  ) { }

  ngOnInit(): void {
    if (this.cartItemToEdit) {
      this.amountToAdd = this.cartItemToEdit.quantity;
      this.isEdit = true;
    }
    if (this.productToAdd) {
      this.cartItemToEdit = this.cartItemsService.cartItems.find((cartItem) => { return cartItem.productId == this.productToAdd.id });
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
        alert("No amount was added.");
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
