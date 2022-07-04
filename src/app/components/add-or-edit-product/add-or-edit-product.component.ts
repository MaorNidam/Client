import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.css']
})
export class AddOrEditProductComponent implements OnInit {

  constructor(
    public formBuilder: UntypedFormBuilder,
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(20)]],
      price: [null, [Validators.required, Validators.min(0.001)]],
      imgUrl: [null, [Validators.required, Validators.maxLength(350)]],
      categoryId: [null, [Validators.required]],
    })
    
    this.categoriesService.followCategoriesArraySubject().subscribe((newCategoryArray) => {
      this.categories = [...newCategoryArray];
    });

    this.productsService.followProductToEditSubject().subscribe((newProduct) => {
      if (newProduct != null) {
        this.productForm.reset();
        this.selectedProduct = newProduct;
        this.productForm.setValue({
          name: this.selectedProduct.name,
          price: this.selectedProduct.price,
          imgUrl: this.selectedProduct.imgUrl,
          categoryId: this.selectedProduct.categoryId
        });

        this.isEdit = true;
      }
    });
  }

  categories: ICategory[] = [];
  selectedProduct: IProduct;
  productForm: FormGroup;
  isEdit: boolean = false;

  handleSubmit = () => {
    let productRequest = {
      id: this.selectedProduct?.id,
      name: this.productForm.controls['name'].value,
      price: this.productForm.controls['price'].value,
      imgUrl: this.productForm.controls['imgUrl'].value,
      categoryId: this.productForm.controls['categoryId'].value,
    }
    if (this.isEdit) {
      this.productsService.editProduct(productRequest);
    }
    else {
      this.productsService.addProduct(productRequest);
      
    }
    this.handleClear();
  }

  handleClear = () => {
    this.productForm.reset();
    this.isEdit = false;
    this.productsService.setProductToEdit(null);
  }
}
