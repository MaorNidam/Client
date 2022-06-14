import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterAccountComponent } from './components/register-account/register-account.component';
import { RegisterPersonalInfoComponent } from './components/register-personal-info/register-personal-info.component';
import { RegisterComponent } from './components/register/register.component';
import { StartingPageComponent } from './components/starting-page/starting-page.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  {
    path: 'home',
    component: StartingPageComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'login', // child route path
        component: LoginComponent, // child route component that the router renders
      },
      {
        path: 'register',
        component: RegisterComponent, // another child route component that the router renders
        children: [
          {
            path: 'account',
            component: RegisterAccountComponent
          },
          {
            path: 'personal',
            component: RegisterPersonalInfoComponent
          },
          {
            path: '',
            redirectTo: 'account',
            pathMatch: 'full'
          }
        ]
      }, {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
