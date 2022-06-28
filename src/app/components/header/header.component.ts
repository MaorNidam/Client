import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private usersService: UserService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private cartsService: CartsService,
    private cartItemsService: CartItemsService,
    private ordersService: OrdersService,
    public stateService: StateService,
    private formBuilder: FormBuilder
  ) {
    this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })
  }

  ngOnInit(): void {
    this.searchControl = this.formBuilder.control("");

    this.searchObservable = this.searchControl.valueChanges;
    this.searchObservable.subscribe((searchValue) => {
      this.categoriesService.activeCategory = 0;
      if (!searchValue) {
        this.productsService.getAllProducts();
      }
      else {
        this.productsService.searchProduct(searchValue);
      }
    })
  }

  currentUser: IUser;

  searchControl: FormControl;
  searchObservable: Observable<any>;

  handleLogout = () => {
    this.usersService.setCurrentUser(null);
    sessionStorage.removeItem("userData");
  }

  searchProduct = () => {
    let searchValue = this.searchControl.value;
    this.productsService.searchProduct(searchValue);

  }
}
