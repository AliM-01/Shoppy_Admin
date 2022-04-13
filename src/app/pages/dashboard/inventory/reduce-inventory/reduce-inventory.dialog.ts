import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReduceInventoryModel } from '@app_models/inventory/reduce-inventory';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading-service';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductService } from '@app_services/shop/product/product.service';

@Component({
  selector: 'app-reduce-inventory',
  templateUrl: './reduce-inventory.dialog.html'
})
export class ReduceInventoryDialog implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("کاهش انبار محصول");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  reduceForm: FormGroup;
  existsProductId: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ReduceInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private inventoryService: InventoryService,
    private productService: ProductService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.reduceForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      count: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });

  }

  ngAfterViewInit() {
    this.reduceForm.controls.productId.valueChanges.pipe(
      debounceTime(750),
      distinctUntilChanged(),
      tap(() => {
        this.checkProductId();
      })
    )
    .subscribe();
  }
  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.reduceForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  checkProductId() {

    let productId = this.reduceForm.controls.productId.value;

    if (productId !== null) {

      this.productService.existsProductId(productId).subscribe(res => {

        if (res.exists === false) {
          this.existsProductId = false;
          this.pageTitleSubject.next("کاهش انبار محصول");

        } else {
          this.existsProductId = true;
          this.pageTitleSubject.next(`کاهش انبار محصول : ${res.productTitle}`);
        }

      });

    } else {
      this.existsProductId = true;
    }

  }

  submitreduceForm() {
    this.loading.loadingOn()

    if (this.reduceForm.valid) {

      const reduceData = new ReduceInventoryModel(
        this.data.id,
        "0",
        this.reduceForm.controls.productId.value,
        this.reduceForm.controls.count.value,
        this.reduceForm.controls.description.value
      );

      this.inventoryService.reduceInventory(reduceData).subscribe((res) => {
        if (res.status === 200) {
          this.reduceForm.reset();
          this.onCloseClick();
        }
      });

    } else {
      this.reduceForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

}
