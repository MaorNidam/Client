import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
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
