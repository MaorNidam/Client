import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    public formBuilder: UntypedFormBuilder,
    public stateService: StateService,
    public ordersService: OrdersService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.ordersService.busyDays = [];
    this.ordersService.getBusyDays();
    
    this.orderForm = this.formBuilder.group({
      city: [this.currentUserValue.city, [Validators.required]],
      street: ["", [Validators.required, Validators.maxLength(100)]],
      shippingDate: ["", [Validators.required]],
      creditCard: [0, [Validators.required, Validators.pattern("^[0-9\-]+$")]],
    });
  }

  orderForm : UntypedFormGroup;
  currentUserValue = this.userService.getUser();


  handleSubmit = () => {
    console.log(this.orderForm);
  }

  handleDblClickStreet = () => {
    this.orderForm.controls['street'].setValue(this.currentUserValue.street);
  }

  creditCardLengthValidator = (control: UntypedFormControl): ValidationErrors | null => {
    let currentValue = control.value;
    console.log(currentValue, currentValue.length);
    
    if (currentValue.length == 20) {
      return null;
    }
    return {
      'creditCardLengthValidator': true
    }
  }

}
