import { Component, OnDestroy, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Account', routerLink: "account" },
      { label: 'Personal Info', routerLink: "personal" }
    ]
  }
  ngOnDestroy(): void {
    //Clean session storage if the user quit in the middle of register.
    sessionStorage.removeItem("register");
  }
  items: MenuItem[];

}

