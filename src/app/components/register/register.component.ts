import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Account', routerLink: "account"},
      {label: 'Personal Info', routerLink: "personal"}
    ]
  }
  items: MenuItem[];

}

