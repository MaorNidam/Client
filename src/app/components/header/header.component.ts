import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private usersService: UserService,
    private cartsService: CartsService,
    private cartItemsService: CartItemsService,
    private ordersService: OrdersService, 
    private formBuilder: FormBuilder
    ) {
      this.usersService.followCurrentUser().subscribe((newUser) => {
        this.currentUser = newUser;
      })
     }

  ngOnInit(): void {
    this.searchControl = this.formBuilder.control("") 
  }

  currentUser: IUser;

  searchControl: FormControl;

  handleLogout = () => {
    this.usersService.setCurrentUser(null);
    sessionStorage.removeItem("userData");
  }
}
