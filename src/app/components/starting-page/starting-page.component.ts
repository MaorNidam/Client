import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.css']
})
export class StartingPageComponent implements OnInit {

  constructor(public productsService: ProductsService, public ordersService: OrdersService, public usersService: UserService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts();
    this.ordersService.getOrdersAmount();
  }

  storeButtonLabel: string = "Start Shopping";

  handleStoreButton = () => {
    
  }
}
