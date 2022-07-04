import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, map, catchError, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  constructor(
    public formBuilder: UntypedFormBuilder,
    public usersService: UserService,
    public messageService: MessageService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      id: ["", [Validators.pattern("^[0-9]+$"), this.idLengthValidator, Validators.required], [this.isExist]],
      email: ["", [Validators.email, Validators.required], [this.isExist]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      verifyPassword: ["", [Validators.required]],
    }, {
      validator: Validators.compose([this.passwordMatchValidator]),
      //WHY IS THIS BUGGY?!?!?!
      // asyncValidators: null,
      // updateOn: 'blur'
    });
  }

  accountForm: UntypedFormGroup;

  handleNext = () => {
    if (this.accountForm.valid) {
      this.usersService.registerUser = {
        id: this.accountForm.get(['id']).value,
        email: this.accountForm.get(['email']).value,
        password: this.accountForm.get(['password']).value
      }
      sessionStorage.setItem("register", JSON.stringify(this.usersService.registerUser));
      this.router.navigate(['home/register/personal']);
    }
  }

  idLengthValidator = (control: UntypedFormControl): ValidationErrors | null => {
    let currentValue = control.value;
    if (currentValue.length == 9) {
      return null;
    }
    return {
      'idLengthValidator': true
    }
  }

  isExist = (control: UntypedFormControl): Observable<ValidationErrors | null> => {
    let userId: string = "";
    let email: string = "";
    if (control.hasValidator(Validators.email)) {
      email = control.value;
    }
    else {
      userId = control.value;
    }
    return this.usersService.isExist(userId, email).pipe(
      map((isExist) => {
        if (isExist) {
          return {
            'isExist': true
          };
        }
        return null;
      }
      ),
      catchError((e) => {
        console.log(e);
        this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Server Error', detail: 'Something went wrong, please try again later.' });
        return of({ "serverError": true });
      })
    )
  }


  passwordMatchValidator = (registerForm: AbstractControl): ValidationErrors | null => {
    let passwordControl = registerForm.get('password');
    let password = passwordControl.value;
    let verifyPasswordControl = registerForm.get('verifyPassword');
    let verifyPassword = verifyPasswordControl.value;
    if (password != verifyPassword) {
      return {
        'passwordMatchValidator': true
      };
    }
    return null
  }
}
