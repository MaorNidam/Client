import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig, private stateService: StateService) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  title = 'OnlineStore';
}
