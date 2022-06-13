import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, map, Observable, pipe } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usersService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [this.userToRegister.id, [Validators.pattern("^[0-9]+$"), this.idLengthValidator, Validators.required], [this.isExist]],
      email: [this.userToRegister.email, [Validators.email, Validators.required], [this.isExist]],
      password: [this.userToRegister.password, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      verifyPassword: [this.userToRegister.verifyPassword, [Validators.required]],
    }, {
      validator: Validators.compose(
        [
          this.passwordMatchValidator,
        ]
      ),
    });
  }


  userToRegister = {
    id: "",
    email: "",
    password: "",
    verifyPassword: ""
  };

  registerForm: FormGroup;

  handleRegister = () => {

  }

  idLengthValidator = (control: FormControl): ValidationErrors | null => {
    let currentValue = control.value;
    if (currentValue.length == 9) {
      return null;
    }
    return {
      'idLengthValidator': true
    }
  }

  isExist = (control: FormControl): Observable<ValidationErrors | null> => {
    let userId: string = "";
    let email: string = "";
    if (control.hasValidator(Validators.email)) {
      email = control.value;
    }
    else {
      userId = control.value;
    }
    return this.usersService.isExist(userId, email).pipe(
      debounceTime(500),
      map((isExist) => {
        if (isExist) {
          return {
            'isExist': true
          };
        }
        return null;
      }))
  }


  passwordMatchValidator = (registerForm: AbstractControl): ValidationErrors | null => {
    let passwordControl = registerForm.get('password');
    let password = passwordControl.value;
    let verifyPasswordControl = registerForm.get('verifyPassword');
    let verifyPassword = verifyPasswordControl.value;
    console.log(passwordControl);
    
    let error = {
      'passwordMatchValidator': true
    };
    if (password == "" || verifyPassword == "" || password != verifyPassword) {
      if (passwordControl.dirty && verifyPasswordControl.dirty) {
        passwordControl.setErrors(error);
        verifyPasswordControl.setErrors(error);
      }
      return error;
    }
    passwordControl.setErrors({
      'passwordMatchValidator': null
    });
    verifyPasswordControl.setErrors({
      'passwordMatchValidator': null
    });
    return null
  }
}

