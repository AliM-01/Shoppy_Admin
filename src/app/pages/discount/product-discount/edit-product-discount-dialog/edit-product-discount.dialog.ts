import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProductDiscountModel } from '@app_models/discount/product-discount/edit-product-discount';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { ProductDiscountService } from '@app_services/discount/product-discount/product-discount.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductService } from '@app_services/shop/product/product.service';
import { LoadingService } from '@loading';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';

@Component({
  selector: 'app-edit-product-discount',
  templateUrl: './edit-product-discount.dialog.html',
  providers: [ProductService]
})
export class EditProductDiscountDialog implements OnInit {

  editForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existsProductId: boolean = false;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;
  unchangedProductId: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditProductDiscountDialog>,
    private ProductDiscountService: ProductDiscountService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });

    this.ProductDiscountService.getProductDiscountDetails(this.data.id).subscribe((res) => {

      if (res.status === 'success') {

        this.unchangedProductId = res.data.productId;
        this.editForm.controls.productId.setValue(res.data.productId)
        this.editForm.controls.rate.setValue(res.data.rate)
        this.startDatepickerInput.nativeElement.value = res.data.startDate;
        this.endDatepickerInput.nativeElement.value = res.data.endDate;
        this.ckeditorTextValue = res.data.description;
        this.ckeditorService.setValue(res.data.description);

      }
    },
      (error) => {
        this.onCloseClick();
      }
    );
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.editForm, controlName, errorName)
  }

  ngAfterViewInit() {

    fromEvent(this.productIdInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.checkProductId();
        })
      )
      .subscribe();
  }

  onCloseClick(): void {
    this.loading.loadingOff();
    this.dialogRef.close();
  }

  submitEditForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();
    this.checkProductId();

    if (!this.existsProductDiscount) {
      if (this.editForm.valid) {

        const editData = new EditProductDiscountModel(
          this.data.id,
          this.editForm.controls.productId.value,
          this.editForm.controls.rate.value,
          this.startDatepickerInput.nativeElement.value,
          this.endDatepickerInput.nativeElement.value,
          this.ckeditorService.getValue(),
        );

        this.ProductDiscountService.editProductDiscount(editData).subscribe((res) => {
          if (res.status === 'success') {
            this.editForm.reset();
            this.onCloseClick();
          }
        });

      } else {
        this.editForm.markAllAsTouched();
      }
    }
    this.loading.loadingOff();

  }

  checkProductId() {

    let productId = this.editForm.controls.productId.value;

    if (productId !== null) {

      this.productService.existsProductId(productId).subscribe(res => {

        if (res.data.exists === false) {
          this.existsProductId = false

        } else {
          this.checkProductHasProductDiscount(productId);
        }

      });

    }
    this.existsProductId = true;
    this.existsProductDiscount = false;
  }

  checkProductHasProductDiscount(productId: string) {
    this.ProductDiscountService.checkProductHasProductDiscount(productId).subscribe(res => {

      if (res.data.existsProductDiscount === true) {
        this.existsProductDiscount = true
      }

    });
  }
}
