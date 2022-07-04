import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { CartItemsService } from './cart-items.service';
import { CartsService } from './carts.service';
import { CategoriesService } from './categories.service';
import { OrdersService } from './orders.service';
import { ProductsService } from './products.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private ordersService: OrdersService,
    private usersService: UserService,
    private cartsService: CartsService,
    private cartItemsService: CartItemsService,
  ) {
    this.productsService.getAllProducts();
    this.ordersService.getOrdersAmount();
    this.categoriesService.getAllCategories();

    this.usersService.followCurrentUser().subscribe((newUser) => {
      if (newUser) {
        this.cartsService.getLastCart();
        this.ordersService.getLastOrderDate();
      }
      else {
        this.cartsService.setCart(null);
        this.ordersService.lastOrderDate = null;
      }
    });

    this.cartsService.followCartSubject().subscribe((newCart) => {
      if (newCart && newCart.isOpen) {
        this.cartItemsService.getCartItems(newCart.id);
      }
      else {
        this.cartItemsService.cartItems = [];
      }
    })
  }

  isStore : boolean = false;
  cities: any[] = ['Akko', 'Afula', 'Al Buţayḩah', 'Al Khushnīyah', 'Ashdod', 'Ashqelon', 'Bat Yam', 'Beersheba', 'Bené Beraq',
  'Bet Shemesh', 'Dimona', 'Eilat', 'El‘ad', 'Eṭ Ṭaiyiba', 'Fīq', 'Givatayim', 'Hadera', 'Haifa', 'Herẕliyya', 'Hod HaSharon',
  'Holon', 'Jerusalem', 'Karmiel', 'Kefar Sava', 'Lod', 'Ma‘alot Tarshīḥā', 'Modi‘in Makkabbim Re‘ut', 'Nahariyya', 'Nazareth',
  'Nes Ẕiyyona', 'Netanya', 'Netivot', 'Or Yehuda', 'Petaẖ Tiqwa', 'Qiryat Ata', 'Qiryat Bialik', 'Qiryat Gat', 'Qiryat Moẕqin',
  'Qiryat Ono', 'Qiryat Yam', 'Ra‘ananna', 'Rahat', 'Ramat Gan', 'Ramat HaSharon', 'Ramla', 'Reẖovot', 'Rishon LeẔiyyon',
  'Rosh Ha‘Ayin', 'Sakhnīn', 'Tamra', 'Tel Aviv-Yafo', 'Tiberias', 'Umm el Faḥm', 'Yehud', 'Ẕefat'];



}
