import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProductCategoryModel } from '@app_models/product-category/create-product-category';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html'
})
export class CreateProductCategoryComponent implements OnInit {

  createForm:FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<CreateProductCategoryComponent>,
    private productCategoryService: ProductCategoryService
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup ({
      title: new FormControl( null, [ Validators.required ]),
      description: new FormControl( null, [ Validators.required ]),
      imageAlt: new FormControl( null, [ Validators.required ]),
      imageTitle: new FormControl( null, [Validators.required ]),
      metaKeywords: new FormControl( null, [ Validators.required ]),
      metaDescription: new FormControl( null, [ Validators.required ])
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  
  submitCreateForm(){
    if(this.createForm.valid){
      const createProductCategoryData = new CreateProductCategoryModel (
        this.createForm.controls.title.value,
        this.createForm.controls.description.value,
        '',
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.metaKeywords.value,
        this.createForm.controls.metaDescription.value
        );

    } else {
      this.createForm.markAllAsTouched();
    }

  }
}
