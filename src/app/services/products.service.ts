import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  baseUrl : string = "http://localhost:3001/products/";
  productsArray: IProduct[] = [];

  getAllProducts = () : void => {
    this.http.get<IProduct[]>(this.baseUrl).subscribe((productsResponse) => {
      this.productsArray = productsResponse;
    }, (e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }

  getAllProductsFromCategory = (categoryId : number) :void => {
    this.http.get<IProduct[]>(this.baseUrl + categoryId).subscribe((productsResponse) => {
      this.productsArray = productsResponse;
    }, (e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }

  searchProduct = (searchString: string) => {
    this.http.get<IProduct[]>(this.baseUrl + "search/" + searchString).subscribe((productsResponse) => {
      this.productsArray = productsResponse;
    }, (e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }

  addProduct = (productToAdd: any) => {
    this.http.post(this.baseUrl, productToAdd).subscribe((productsResponse) => {
      // let newProductId = productsResponse;
      // productToAdd.id = newProductId;
      // this.productsArray.push(productToAdd);
    }, (e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }

  editProduct = (productToEdit: any) => {
    this.http.put(this.baseUrl, productToEdit).subscribe((productsResponse) => {
      // let newProductId = productsResponse;
      // productToAdd.id = newProductId;
      // this.productsArray.push(productToAdd);
    }, (e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }
}
