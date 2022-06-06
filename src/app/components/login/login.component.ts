import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public usersService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  email: string = '';
  isEmailError = true;
  emailErrorMessage : string;

  password: string = '';
  isPasswordError: boolean = false;
  passwordErrorMessage : string;

  handleLogin = () => {
    let user = {
      email: this.email,
      password: this.password
    }
    try {
      this.validateLogin(user);
      this.usersService.login(user.email, user.password)
    }
    catch (e) {

    }
  }

  validateLogin = (user: any) => {
    if (user.email.trim() == "") {
      this.isEmailError = true;
      this.emailErrorMessage = "E-mail is required";
    }
  }
}
