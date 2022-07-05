import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, Subscription, tap } from 'rxjs';
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
export class HeaderComponent implements OnInit,OnDestroy {

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
  }
  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subscription) => {
      subscription.unsubscribe();
    })
    this.subscriptionArray = [];
  }
  
  ngOnInit(): void {
    this.searchControl = this.formBuilder.control("");

    let userSubscription = this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })
    
    let categorySubscription = this.categoriesService.followActiveCategorySubject().subscribe((newCategory) => {
      if (newCategory != 0) {
        this.searchControl.setValue('');
      }
    })
    
    this.searchObservable = this.searchControl.valueChanges;
    let searchSubscribe = this.searchObservable.subscribe((searchValue) => {
      this.categoriesService.setActiveCategory(0);
      if (searchValue) {
        this.productsService.searchProduct(searchValue);
      }
    })

    this.subscriptionArray.push(userSubscription, categorySubscription, searchSubscribe);
  }

  currentUser: IUser;
  searchControl: FormControl;
  searchObservable: Observable<any>;
  subscriptionArray: Subscription[] = [];

  handleLogout = () => {
    this.usersService.setCurrentUser(null);
    sessionStorage.removeItem("userData");
  }

}
