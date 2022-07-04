import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser: IUser;
    this.userService.followCurrentUser().subscribe((newUser) => {
      currentUser = newUser;
    })
    if (!currentUser) {
      this.messageService.add({key: 'appToast', severity:'error', summary: 'Log in', detail: 'Please log in.'})
      this.router.navigate(['home/login']);
      return false;
    }
    else {
      return true;
    }
  }

}
