import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
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
    public usersService: UserService
  ) { }

  ngOnInit(): void {
    this.stateService.isStore = true;
    this. userSubscription = this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })
  }

  currentUser : IUser;
  userSubscription : Subscription;
  
  ngOnDestroy(): void {
    this.stateService.isStore = false;
    this.userSubscription.unsubscribe();
  }

  isCartDisplay: Boolean = true;
}
