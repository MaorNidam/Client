import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private messageService: MessageService) {
   }

  private categoriesArray : ICategory[] = [];
  activeCategorySubject = new BehaviorSubject(0);
  categoriesArraySubject = new BehaviorSubject([]);

  getAllCategories = () => {
    this.http.get<ICategory[]>('http://localhost:3001/categories').subscribe((categoriesResponse) => {
      this.categoriesArray = categoriesResponse;
      this.categoriesArraySubject.next(this.categoriesArray);
    },(e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }

  followCategoriesArraySubject = (): Observable<ICategory[]> => {
    return this.categoriesArraySubject.asObservable();
  }

  followActiveCategorySubject = () : Observable<number> => {
    return this.activeCategorySubject.asObservable();
  }

  setActiveCategory = (newCategory) => {
    this.activeCategorySubject.next(newCategory);
  }

}
