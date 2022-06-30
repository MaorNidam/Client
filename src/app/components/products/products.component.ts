import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/models/ICartItems';
import { IProduct } from 'src/app/models/IProduct';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public cartItemsService: CartItemsService
  ) { }

  isModalShown = false;
  productToAdd: IProduct;
  activeCategory: number = 0;



  ngOnInit(): void {
    this.categoriesService.followCategorySubject().subscribe((newCategory) => {
      this.activeCategory = newCategory;
    })
  }

  handleCategoryChange = (event: any) => {
    this.categoriesService.setCategory(event.index);
    let selectedCategoryValue = event.originalEvent.target.innerText;
    let selectedCategory = this.categoriesService.categoriesArray.find((category) => { return category.name == selectedCategoryValue });
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

}
