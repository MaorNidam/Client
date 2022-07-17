import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRegister } from '../models/IRegister';
import { IUser } from '../models/IUser';
import { CartsService } from './carts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private cartService: CartsService,
    private messageService: MessageService
  ) {
  }

  private currentUser?: IUser;
  private currentUserSubject = new BehaviorSubject<IUser>(null);
  public registerUser?: IRegister;
  private decode = new JwtHelperService();


  login = (email: string, password: string): void => {
    this.http.post<any>("http://localhost:3001/users/login", { email, password }).subscribe((loginResponse) => {
      this.currentUser = {
        token: loginResponse.token,
        firstName: loginResponse.firstName,
        lastName: loginResponse.lastName,
        role: this.decode.decodeToken(loginResponse.token).role,
        city: loginResponse.city,
        street: loginResponse.street
      };
      sessionStorage.setItem("userData", JSON.stringify(this.currentUser));
      this.currentUserSubject.next(this.currentUser);

      if (loginResponse.userCart) {
        if (loginResponse.userCart.isOpen) {
          this.cartService.setCart(loginResponse.userCart);
        }
      }
      

    }, (e) => {
      console.log(e);
      if (e.error == "Invalid e-mail or password.") {
        this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Log in failed.', detail: 'Invalid e-mail or password.' });
      }
      else {
        this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
      }
    })
  }

  register = (userRequest: IRegister): void => {
    this.http.post('http://localhost:3001/users/', userRequest).subscribe((registerResponse) => {
      this.messageService.add({ key: 'appToast', severity: 'success', summary: 'Success!', detail: 'Your registration has been successfully completed.' });
    }, (e) => {
      console.log(e);
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
    })
  }

  isExist = (userId: string, email: string): Observable<boolean> => {
    return this.http.post<boolean>('http://localhost:3001/users/isExist', { userId, email });
  }

  followCurrentUser = (): Observable<IUser> => {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser = (newUser: IUser) => {
    this.currentUser = newUser;
    this.currentUserSubject.next(newUser);
  }

  getUser = () : IUser => {
    return this.currentUserSubject.value;
  }
}
