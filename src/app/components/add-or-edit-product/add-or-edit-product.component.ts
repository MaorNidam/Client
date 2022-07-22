import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.css']
})
export class AddOrEditProductComponent implements OnInit, OnDestroy {

  constructor(
    public formBuilder: UntypedFormBuilder,
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public stateService: StateService,
    public messageService: MessageService
  ) { }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //Init form with null values, and the validators.
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(20)]],
      price: [null, [Validators.required, Validators.min(0.001), Validators.max(10000)]],
      imgUrl: [null, [Validators.required, Validators.maxLength(350)]],
      categoryId: [null, [Validators.required]],
    })

    this.categoriesSubscription = this.categoriesService.followCategoriesArraySubject().subscribe((newCategoryArray) => {
      this.categories = newCategoryArray;
    });


    //Start following the product to edit subject, set the values to the form if a product was choosen.
    this.productSubscription = this.productsService.followProductToEditSubject().subscribe((newProduct) => {
      if (newProduct != null) {
        // resets the form to prevent old values.
        this.productForm.reset();
        console.log(newProduct);

        this.selectedProduct = newProduct;
        this.updateFromValues();

        this.isEdit = true;
      }
    });
  }

  categories: ICategory[] = [];
  selectedProduct: IProduct;
  productForm: FormGroup;
  isEdit: boolean = false;
  productSubscription: Subscription;
  categoriesSubscription: Subscription;

  handleSubmit = () => {
    let productRequest = {
      // id will exist only if the admin is editing a product.
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

  updateFromValues = () => {
    this.productForm.setValue({
      name: this.selectedProduct.name,
      price: this.selectedProduct.price,
      imgUrl: this.selectedProduct.imgUrl,
      categoryId: this.selectedProduct.categoryId
    });
  }

  handleClear = () => {
    this.productForm.reset();
    this.isEdit = false;
    this.productsService.setProductToEdit(null);
    this.stateService.clearSearchInput()
  }

}
