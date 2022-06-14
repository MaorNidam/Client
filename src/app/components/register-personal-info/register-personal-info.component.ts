import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-personal-info',
  templateUrl: './register-personal-info.component.html',
  styleUrls: ['./register-personal-info.component.css']
})
export class RegisterPersonalInfoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegisterDataFromSessionStorage();
  }

  personalInfoForm: FormGroup;


  getRegisterDataFromSessionStorage = () => {
    let lastSavedRegister = sessionStorage.getItem("register");
    if (lastSavedRegister) {
      this.usersService.registerUser = JSON.parse(lastSavedRegister);
    }
  }
}
