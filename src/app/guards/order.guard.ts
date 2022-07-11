import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, map, Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { CartItemsService } from '../services/cart-items.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private cartItemsService: CartItemsService,
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

    if (currentUser?.role == "admin") {
      this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Unauthorized', detail: 'Admins are not allowed in here.' })
      this.router.navigate(['/home']);
      return false;
    }

    return this.cartItemsService.followCartItemsSubject().pipe(
      filter(newItems => newItems != null),
      map((newItems) => {
        if (newItems.length > 0) {
          return true;
        }
        else {
          this.messageService.add({ key: 'appToast', severity: 'error', summary: 'Empty Cart', detail: `Your cart is empty. Please resume shopping.` })
          this.router.navigate(['/store']);
          return false;
        }
      }))
  }
}
