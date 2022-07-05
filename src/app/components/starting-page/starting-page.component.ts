import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/ICart';
import { IUser } from 'src/app/models/IUser';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.css'],
  providers: [MessageService]
})
export class StartingPageComponent implements OnInit,OnDestroy {

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public usersService: UserService,
    public cartsService: CartsService,
    public cartItemsService: CartItemsService,
    public messageService: MessageService,
    public router : Router
  ) { }
  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  ngOnInit(): void {
    let userSubscription = this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })

    let cartSubscription = this.cartsService.followCartSubject().subscribe((newCart) => {
      this.cart = newCart;
    })

    this.subscriptionsArray.push(userSubscription, cartSubscription);
  }
  
  cart: ICart;
  currentUser: IUser;
  isLogin: boolean = true;
  subscriptionsArray: Subscription[] = [];
  
  handleStartShoppingButton = () => {
    this.cartsService.openCart();
    this.router.navigate(['/store']);
  }
  
}
