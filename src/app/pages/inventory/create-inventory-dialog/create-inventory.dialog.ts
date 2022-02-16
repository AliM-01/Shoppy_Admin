import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateInventoryModel } from '@app_models/inventory/create-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { LoadingService } from '@loading';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductService } from '@app_services/shop/product/product.service';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-inventory.dialog.html'
})
export class CreateInventoryDialog implements OnInit, AfterViewInit {
  
  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("ایجاد انبار محصول");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  createForm: FormGroup;
  existsProductId: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CreateInventoryDialog>,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      unitPrice: new FormControl(null, [Validators.required])
    });

  }

  ngAfterViewInit() {
    this.createForm.controls.productId.valueChanges.pipe(
      debounceTime(750),
      distinctUntilChanged(),
      tap(() => {
        this.checkProductId();
      })
    )
    .subscribe();
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.createForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  checkProductId() {

    let productId = this.createForm.controls.productId.value;

    if (productId !== null) {

      this.productService.existsProductId(productId).subscribe(res => {

        if (res.data.exists === false) {
          this.existsProductId = false;
          this.pageTitleSubject.next("ایجاد انبار محصول");

        } else {
          this.existsProductId = true;
          this.pageTitleSubject.next(`ایجاد انبار محصول : ${res.data.productTitle}`);
        }

      });

    } else {
      this.existsProductId = true;
    }

  }

  submitCreateForm() {

    this.loading.loadingOn();

    if (this.createForm.valid) {

      const createData = new CreateInventoryModel(
        this.createForm.controls.productId.value,
        this.createForm.controls.unitPrice.value
      );

      this.inventoryService.createInventory(createData).subscribe(res => {
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
