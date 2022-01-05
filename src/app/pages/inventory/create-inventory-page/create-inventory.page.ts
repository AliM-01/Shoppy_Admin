import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreateInventoryModel } from '@app_models/inventory/create-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { LoadingService } from '@app_services/common/loading/loading.service';

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

    this.loading.loadingOn();

    this.activatedRoute.params.subscribe(params => {
      this.productId = params.productId;

      if (this.productId === undefined) {
        this.loading.loadingOff()

        this.route.navigate(['/product']);
      }

    });

    this.createForm = new FormGroup({
      unitPrice: new FormControl(null, [Validators.required])
    });

    this.loading.loadingOff();

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
