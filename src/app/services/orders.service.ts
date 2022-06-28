import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderRequest } from '../models/IOrderRequest';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:3001/orders/";
  lastOrderDate: Date;
  amountOfOrder: number;
  busyDays : Date[] = [];

  getLastOrderDate = () => {
    this.http.get<any>(this.baseUrl).subscribe((ordersResponse) => {
      if (ordersResponse.orderDate) {
        this.lastOrderDate = new Date(ordersResponse.orderDate);
      }
    }, (e) => {
      alert("Something went wrong.");
      console.log(e);
    })
  }

  getReceipt = () => {
    this.http.get(this.baseUrl).subscribe((ordersResponse) => {

    }, (e) => {
      alert("Something went wrong.");
      console.log(e);

    })
  }

  getOrdersAmount = () => {
    this.http.get<number>(this.baseUrl+"amount/").subscribe((ordersResponse) => {
      this.amountOfOrder = ordersResponse;
    }, (e) => {
      alert("Something went wrong.");
      console.log(e);

    })
  }

  getBusyDays = () => {
    this.http.get<string[]>(this.baseUrl+ "/days").subscribe((ordersResponse) => {
      ordersResponse.forEach((day) => {
        this.busyDays.push(new Date(day));
      });
    }, (e) => {
      alert("Something went wrong.");
      console.log(e);

    })
  }

  addOrder = (orderRequest: IOrderRequest) => {
    this.http.post(this.baseUrl, orderRequest).subscribe((ordersResponse) => {

    }, (e) => {
      alert("Something went wrong.");
      console.log(e);

    })
  }
}
