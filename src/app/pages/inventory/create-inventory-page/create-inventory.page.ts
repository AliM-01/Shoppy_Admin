import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreateInventoryModel } from '@app_models/inventory/create-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { LoadingService } from '@loading';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-inventory.page.html'
})
export class CreateInventoryPage implements OnInit {

  createForm: FormGroup;
  productId: number = 0;

  constructor(
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private pageTitle: Title,
    private loading: LoadingService,
    private _location: Location
  ) {
    this.pageTitle.setTitle('ایجاد انبار محصول');
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.productId = params.productId;

      if (this.productId === undefined) {
        this.route.navigate(['/product']);
      }

    });

    this.createForm = new FormGroup({
      unitPrice: new FormControl(null, [Validators.required])
    });

  }
  
  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.createForm, controlName, errorName)
  }

  onCloseClick(): void {
    this._location.back();
  }

  submitCreateForm() {
    this.loading.loadingOn();

    if (this.createForm.valid) {

      const createData = new CreateInventoryModel(
        this.productId,
        this.createForm.controls.unitPrice.value
      );

      this.inventoryService.createInventory(createData).subscribe((res) => {
        if (res.status === 'success') {

          this.createForm.reset();
          this.onCloseClick();

        }
      });

    } else {
      this.createForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }
}
