import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IOrderRequest } from '../models/IOrderRequest';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    ) { }
  baseUrl: string = "http://localhost:3001/orders/";
  lastOrderDate: Date;
  amountOfOrder: number;
  busyDays: Date[] = [];

  getLastOrderDate = () => {
    this.http.get<any>(this.baseUrl).subscribe((ordersResponse) => {
      if (ordersResponse.orderDate) {
        this.lastOrderDate = new Date(ordersResponse.orderDate);
      }
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);
    })
  }

  getReceipt = (cartId) => {
    return this.http.get(this.baseUrl + cartId, { responseType: "blob" })
  }

  getOrdersAmount = () => {
    this.http.get<number>(this.baseUrl + "amount/").subscribe((ordersResponse) => {
      this.amountOfOrder = ordersResponse;
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);

    })
  }

  getBusyDays = () => {
    this.http.get<string[]>(this.baseUrl + "/days").subscribe((ordersResponse) => {
      ordersResponse.forEach((day) => {
        this.busyDays.push(new Date(day));
      });
    }, (e) => {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      console.log(e);
    })
  }

  addOrder = (orderRequest: IOrderRequest) => {
    return this.http.post(this.baseUrl, orderRequest);
  }
}
