import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/IUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    public usersService: UserService,
    public router: Router,
    public formBuilder: UntypedFormBuilder
  ) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    });

    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
  }

  currentUser: IUser;
  loginForm: UntypedFormGroup;
  userSubscription: Subscription;

  handleLogin = () => {
    let user = {
      email: this.loginForm.get(['email']).value,
      password: this.loginForm.get(['password']).value
    }

    this.usersService.login(user.email, user.password);
  }
}
