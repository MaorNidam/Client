import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IOrderRequest } from 'src/app/models/IOrderRequest';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {

  constructor(
    public formBuilder: UntypedFormBuilder,
    public stateService: StateService,
    public ordersService: OrdersService,
    public userService: UserService,
    public cartsService: CartsService,
    public cartItemsService: CartItemsService,
    public messageService: MessageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.ordersService.busyDays = [];
    this.ordersService.getBusyDays();

    this.orderForm = this.formBuilder.group({
      city: [this.currentUserValue.city, [Validators.required]],
      street: ["", [Validators.required, Validators.maxLength(100)]],
      shippingDate: [null, [Validators.required]],
      creditCard: [0, [Validators.required, Validators.pattern("^[0-9\-]+$")]],
    });
  }

  orderForm: UntypedFormGroup;
  currentUserValue = this.userService.getUser();
  todayDate = new Date();


  handleSubmit = () => {
    let creditCard: string = this.orderForm.controls['creditCard'].value
    let lastCardDigits = creditCard.slice(creditCard.length - 4, creditCard.length)
    let orderRequest: IOrderRequest = {
      cartId: this.cartsService.getCart().id,
      finalPrice: this.cartItemsService.totalPrice,
      shippingCity: this.orderForm.controls['city'].value,
      shippingStreet: this.orderForm.controls['street'].value,
      shippingDate: this.orderForm.controls['shippingDate'].value,
      paymentLastDigits: lastCardDigits,
    }
    this.ordersService.addOrder(orderRequest).subscribe((ordersResponse) => {
      this.messageService.add({ key: 'orderToast', sticky: true, severity: 'success', summary: 'Order Confirmed', detail: 'Download receipt?' });
      //Update the amount of orders.
      this.ordersService.getOrdersAmount();
    }, (e) => {
      this.messageService.add({ key: 'errorToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);
    });
  }
  
  onCloseToast = () => {
    this.cartsService.openCart();
    this.ordersService.getLastOrderDate();
    this.router.navigate(['home']);
  }
  
  onGetReceipt = () => {
    let cartId = this.cartsService.getCart().id;
    this.ordersService.getReceipt(cartId).subscribe(blob => {
      saveAs(blob, cartId + '.txt');
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);
      
    });
  }

  handleDblClickStreet = () => {
    this.orderForm.controls['street'].setValue(this.currentUserValue.street);
  }

}
