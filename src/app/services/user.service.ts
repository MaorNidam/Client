import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IRegister } from '../models/IRegister';
import { IUser } from '../models/IUser';
import SuccessfullLoginServerResponce from '../models/SuccessfullLoginServerResponce';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) {
    //TODO: sessionStorage login
   }

  public currentUser?: IUser;

  login = (userName: string, password: string) : void => {
    this.http.post<IUser>("http://localhost:3001/users/login", {email: userName, password}).subscribe((loginResponse) => {
      this.currentUser = loginResponse;
      sessionStorage.setItem("userData", JSON.stringify(this.currentUser));
    },(e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }

  register = (userRequest: IRegister) : void => {
    this.http.post('http://localhost:3001/users/', userRequest).subscribe((registerResponse) => {
      alert("Register successful")
    },(e) => {
      console.log(e);
      alert("Something went wrong.");
    })
  }
}
