import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
   }

  categoriesArray : ICategory[] = [{id : 0, name: "All"}];
  activeCategory : number = 0;

  getAllCategories = () => {
    this.http.get<ICategory[]>('http://localhost:3001/categories').subscribe((categoriesResponse) => {
      categoriesResponse.forEach((category) => {
        this.categoriesArray.push(category);
      });
    },(e) => {
      console.log(e);
      alert("Something went wrong.")
    })
  }

}
