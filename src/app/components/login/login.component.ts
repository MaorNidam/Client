import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import SuccessfullLoginServerResponce from 'src/app/models/SuccessfullLoginServerResponce';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private stateService: ProductsService) { }

  ngOnInit(): void {
    this.stateService.editProduct({"id": 5, "name" : "Cheder", 
    "price" : 5.6,
    "imgUrl" : "../cola.jpg",
    "categoryId" : 2});
  }
  
  userName: string = '';

  password: string = '';

  handleLogin = () => {
    let user = {
      name: this.userName,
      password: this.password
    }
    //validate(user);
    this.userService.login(user.name, user.password)
      
      // this.router.navigate(['vacations']);
      
    
  }
}
