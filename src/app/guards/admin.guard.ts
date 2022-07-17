import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let currentUser: IUser;
    this.userService.followCurrentUser().subscribe((newUser) => {
      currentUser = newUser;
    })
    if (currentUser?.role != "admin") {
      this.messageService.add({key: 'appToast', severity:'error', summary: 'Access Denied.', detail: 'Unauthorized entry. Admins only!'})
      this.router.navigate(['/home']);
      return false;
    }
    else {
      return true;
    }
  }
  
}
