import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./starting-page.component.css']
})
export class StartingPageComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public usersService: UserService,
    public cartsService: CartsService,
    public cartItemsService: CartItemsService,
    public router : Router
  ) { }

  ngOnInit(): void {
    this.productsService.getAllProducts();
    this.ordersService.getOrdersAmount();
    this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })

    this.cartsService.followCartSubject().subscribe((newCart) => {
      this.cart = newCart;
    })
  }

  cart: ICart;
  currentUser: IUser;
  isLogin: boolean = true;
  
  handleStartShoppingButton = () => {
    this.cartsService.openCart();
    this.router.navigate(['/store']);
  }
  
}
