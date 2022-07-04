import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-personal-info',
  templateUrl: './register-personal-info.component.html',
  styleUrls: ['./register-personal-info.component.css']
})
export class RegisterPersonalInfoComponent implements OnInit {

  constructor(
    public formBuilder: UntypedFormBuilder,
    public usersService: UserService,
    public stateService: StateService,
    public messageService: MessageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getRegisterDataFromSessionStorage();
    this.personalInfoForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$"), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.pattern("^[A-Za-z ]+$"), Validators.maxLength(50)]],
      city: ["", [Validators.required]],
      street: ["", [Validators.required, Validators.maxLength(100)]],
    });
  }

  personalInfoForm: UntypedFormGroup;

  handleSubmit = () => {
    sessionStorage.removeItem("register");
    if (this.usersService.registerUser) {
      this.usersService.registerUser.firstName = this.personalInfoForm.get(['firstName']).value;
      this.usersService.registerUser.lastName = this.personalInfoForm.get(['lastName']).value;
      this.usersService.registerUser.city = this.personalInfoForm.get(['city']).value;
      this.usersService.registerUser.street = this.personalInfoForm.get(['street']).value;
      
      this.usersService.register(this.usersService.registerUser);
      this.router.navigate(['home']);
    }
    else {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Error', detail: 'Something went wrong, please try again later.' });
      this.router.navigate(['home/register/account'])
    }
  }

  getRegisterDataFromSessionStorage = () => {
    let lastSavedRegister = sessionStorage.getItem("register");
    if (lastSavedRegister) {
      this.usersService.registerUser = JSON.parse(lastSavedRegister);
    }
  }
}
