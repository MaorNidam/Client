import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataView } from 'primeng/dataview';
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
    public messageService: MessageService,
    public router: Router
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.cartItemsService.followCartItemsSubject().subscribe((newItems) => {
      if (newItems) {
        this.cartItems = newItems;
      }
    })
  }

  //isOrder exists to check if the cart was called from the order component or store component.
  @Input() isOrder: boolean;

  isModalShown: boolean = false;
  cartItemToEdit: ICartItem;
  cartItems: ICartItem[] = [];
  subscription: Subscription;
  searchString: string;
  @ViewChild('dv') dataView: DataView;

  handleDelete = (cartItemId: number) => {
    let cartId = this.cartsService.getCart().id;
    this.cartItemsService.deleteCartItem(cartItemId, cartId);
  }

  handleEdit = (cartItem: ICartItem) => {
    this.isModalShown = true;
    this.cartItemToEdit = cartItem;
  }
  
  handleClearCart = () => {
    this.messageService.clear('c');
    let cartId = this.cartsService.getCart().id;
    this.cartItemsService.deleteAllItemsFromCart(cartId);
  }

  handlePayment = () => {
    this.router.navigate(['order']);
  }

  handleSearch = (searchInputValue: string) => {
    //Access the built in search input, and filters according to the search value.
    this.dataView.filter(searchInputValue);
    if (this.isOrder) {
      //If the user did the search from the order component, this searchString value goes to the marker pipe.
      this.searchString = searchInputValue;
    }
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

// onConfirm() {
//   this.onClearCartItemsClicked();
// }

onReject() {
  this.messageService.clear('c');
}
}
