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
      if (newUser && newUser.role == 'user') {
        this.cartsService.getLastCart();
        this.ordersService.getLastOrderDate();
      }
      else {
        this.cartsService.setCart(null);
        this.ordersService.lastOrderDate = null;
      }
    });

    this.cartsService.followCartSubject().subscribe((newCart) => {
      if (newCart) {
        // Cart with id 0 means there were no carts for this user at the data base.
        if (newCart?.id == 0 || newCart.isOpen == false) {
          this.cartsService.openCart();
        }
        else {
          this.cartItemsService.getCartItems(newCart.id);
        }
      }
      else {
        this.cartItemsService.setCartItems(null);
      }
    })
  }

  isStore: boolean = false;
  cities: any[] = ['Akko', 'Afula', 'Al Buţayḩah', 'Al Khushnīyah', 'Ashdod', 'Ashqelon', 'Bat Yam', 'Beersheba', 'Bené Beraq',
    'Bet Shemesh', 'Dimona', 'Eilat', 'El‘ad', 'Eṭ Ṭaiyiba', 'Fīq', 'Givatayim', 'Hadera', 'Haifa', 'Herẕliyya', 'Hod HaSharon',
    'Holon', 'Jerusalem', 'Karmiel', 'Kefar Sava', 'Lod', 'Ma‘alot Tarshīḥā', 'Modi‘in Makkabbim Re‘ut', 'Nahariyya', 'Nazareth',
    'Nes Ẕiyyona', 'Netanya', 'Netivot', 'Or Yehuda', 'Petaẖ Tiqwa', 'Qiryat Ata', 'Qiryat Bialik', 'Qiryat Gat', 'Qiryat Moẕqin',
    'Qiryat Ono', 'Qiryat Yam', 'Ra‘ananna', 'Rahat', 'Ramat Gan', 'Ramat HaSharon', 'Ramla', 'Reẖovot', 'Rishon LeẔiyyon',
    'Rosh Ha‘Ayin', 'Sakhnīn', 'Tamra', 'Tel Aviv-Yafo', 'Tiberias', 'Umm el Faḥm', 'Yehud', 'Ẕefat'];
}
