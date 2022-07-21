import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { TabPanel } from 'primeng/tabview';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { IUser } from 'src/app/models/IUser';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public cartItemsService: CartItemsService,
    public usersService: UserService
  ) { }
  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  isModalShown = false;
  productToAdd: IProduct;
  activeCategory: number;
  currentUser: IUser;
  categories: ICategory[] = [];
  subscriptionsArray: Subscription[] = [];
  @ViewChild('dataView') dataView : DataView;

  ngOnInit(): void {
    this.productsService.getAllProducts();
    let categorySubscription = this.categoriesService.followCategoriesArraySubject().subscribe((newCategoryArray) => {
      // Spread operator fixes error on startup.
      this.categories = [...newCategoryArray];
      // manually add the "All" category, since it doesn't exist in the data base.
      this.categories.unshift({ id: 0, name: "All" });
    });

    let activeSubscription = this.categoriesService.followActiveCategorySubject().subscribe((newCategory) => {
      this.activeCategory = newCategory;
      if (this.dataView) {
        // The DataView component comes with a built in paginator, this line returns to the first page when the category was changed.
        this.dataView.first = 0;
      }
    })

    let userSubscription = this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })

    this.subscriptionsArray.push(categorySubscription, activeSubscription, userSubscription);
  }

  handleCategoryChange = (event: any) => {
    //Tells the search input that the category was changed.
    this.categoriesService.setActiveCategory(event.index);

    //Finds which category was selected.
    let selectedCategoryValue = event.originalEvent.target.innerText;
    let selectedCategory = this.categories.find((category) => { return category.name == selectedCategoryValue });

    if (selectedCategory.name == "All") {
      this.productsService.getAllProducts();
    }
    else {
      this.productsService.getAllProductsFromCategory(selectedCategory.id);
    }
  }

  handleAddToCart = (productToAdd: IProduct) => {
    this.isModalShown = true;
    this.productToAdd = productToAdd;
  }

  handleEdit = (productToEdit: IProduct) => {
    this.productsService.setProductToEdit(productToEdit);
  }
}
