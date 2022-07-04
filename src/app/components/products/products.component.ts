import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/models/ICartItems';
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
export class ProductsComponent implements OnInit {

  constructor(
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public cartItemsService: CartItemsService,
    public usersService: UserService
  ) { }

  isModalShown = false;
  productToAdd: IProduct;
  activeCategory: number = 0;
  currentUser: IUser;
  categories: ICategory[] = [];



  ngOnInit(): void {
    this.categoriesService.followCategoriesArraySubject().subscribe((newCategoryArray) => {
      this.categories = [...newCategoryArray];
      this.categories.unshift({id : 0, name: "All"});
    });

    this.categoriesService.followActiveCategorySubject().subscribe((newCategory) => {
      this.activeCategory = newCategory;
    })

    this.usersService.followCurrentUser().subscribe((newUser) => {
      this.currentUser = newUser;
    })
  }

  handleCategoryChange = (event: any) => {
    this.categoriesService.setActiveCategory(event.index);
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
