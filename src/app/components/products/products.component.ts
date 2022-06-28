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



  ngOnInit(): void {
  }

  handleCategoryChange = (event: any) => {
    let selectedCategoryValue = event.originalEvent.target.innerText;
    let selectedCategory = this.categoriesService.categoriesArray.find((category) => { return category.name == selectedCategoryValue });
    if (selectedCategory.name == "All") {
      this.productsService.getAllProducts();
    }
    else {
      this.productsService.getAllProductsFromCategory(selectedCategory.id);
    }
    console.log(this.categoriesService.activeCategory);
    
  }

  handleAddToCart = (productToAdd: IProduct) => {
    this.isModalShown = true;
    this.productToAdd = productToAdd;
  }

}
