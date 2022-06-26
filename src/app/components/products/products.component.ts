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
  productToAdd : IProduct;
  amountToAdd = 0;

  ngOnInit(): void {
  }

  handleCategoryChange = (event: any) => {
    console.log(event);
  }

  handleAddToCart = (productToAdd : IProduct) => {
    this.isModalShown = true;
    this.productToAdd = productToAdd;
  }
}
