import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private messageService: MessageService, private categoriesService: CategoriesService) { }

  baseUrl : string = "http://localhost:3001/products/";
  productsArray: IProduct[] = [];
  amountOfProducts: number;
  private productToEditSubject = new BehaviorSubject<IProduct>(null);

  getAllProducts = () : void => {
    this.http.get<IProduct[]>(this.baseUrl).subscribe((productsResponse) => {
      this.productsArray = productsResponse;
      this.amountOfProducts = this.productsArray.length;
      this.categoriesService.setActiveCategory(0);
    }, (e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }

  getAllProductsFromCategory = (categoryId : number) : void => {
    this.http.get<IProduct[]>(this.baseUrl + categoryId).subscribe((productsResponse) => {
      this.productsArray = productsResponse;
    }, (e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }

  searchProduct = (searchString: string) => {
    this.http.get<IProduct[]>(this.baseUrl + "search/" + searchString).subscribe((productsResponse) => {
      this.productsArray = productsResponse;
    }, (e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }

  addProduct = (productToAdd: any) => {
    this.http.post(this.baseUrl, productToAdd).subscribe((productsResponse) => {
      this.messageService.add({key: 'appToast', severity:'success', summary: 'Product added!', detail: `${productToAdd.name} was added successfully!`})
      this.getAllProducts();
    }, (e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }
  
  editProduct = (productToEdit: any) => {
    this.http.put(this.baseUrl, productToEdit).subscribe((productsResponse) => {
      this.messageService.add({key: 'appToast', severity:'success', summary: 'Product updated!', detail: `${productToEdit.name} was updated successfully!`})
      this.getAllProducts();
    }, (e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }

  setProductToEdit = (selectedProduct: IProduct) : void => {
    this.productToEditSubject.next(selectedProduct);
  }

  followProductToEditSubject = () : Observable<IProduct>  => {
    return this.productToEditSubject.asObservable();
  }
}
