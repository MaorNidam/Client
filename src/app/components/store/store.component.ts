import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit,OnDestroy {

  constructor(
    public categoriesService: CategoriesService,
    public stateService: StateService 
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories();
    this.stateService.isStore = true;
  }

  ngOnDestroy(): void {
    this.stateService.isStore = false;
  }

  isCartDisplay: Boolean = true;
}
