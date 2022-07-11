import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/models/ICart';
import { IUser } from 'src/app/models/IUser';
import { CartsService } from 'src/app/services/carts.service';
import { CategoriesService } from 'src/app/services/categories.service';
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
    public stateService: StateService,
    public usersService: UserService,
    public cartsService: CartsService
  ) { }

  ngOnInit(): void {
    this.stateService.isStore = true;
    let userSubscription = this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    });

    let cartSubscription = this.cartsService.followCartSubject().subscribe((newCart) => {
      this.currentCart = newCart; 
    });
    

    this.subscriptions.push(userSubscription, cartSubscription);
  }

  currentUser : IUser;
  currentCart : ICart;
  subscriptions : Subscription[] = [];
  
  ngOnDestroy(): void {
    this.stateService.isStore = false;
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  isCartDisplay: Boolean = true;
}
