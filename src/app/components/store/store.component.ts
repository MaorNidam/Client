import { Component, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public usersService: UserService,
    public cartsService: CartsService,
    public cartItemsService: CartItemsService,
    public categoriesService: CategoriesService 
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories();
  }

  isCartDisplay: Boolean = true;
}
