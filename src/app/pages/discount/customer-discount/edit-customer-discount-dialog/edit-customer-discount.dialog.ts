import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCustomerDiscountModel } from '@app_models/discount/customer-discount/edit-customer-discount';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductService } from '@app_services/shop/product/product.service';
import { LoadingService } from '@loading';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';

@Component({
  selector: 'app-edit-customer-discount',
  templateUrl: './edit-customer-discount.dialog.html',
  providers: [ProductService]
})
export class EditCustomerDiscountDialog implements OnInit {

  editForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existsProductId: boolean = false;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;
  unchangedProductId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerDiscountDialog>,
    private customerDiscountService: CustomerDiscountService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });

    this.customerDiscountService.getCustomerDiscountDetails(this.data.id).subscribe((res) => {

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
        debounceTime(150),
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

        const editData = new EditCustomerDiscountModel(
          this.data.id,
          this.editForm.controls.productId.value,
          this.editForm.controls.rate.value,
          this.startDatepickerInput.nativeElement.value,
          this.endDatepickerInput.nativeElement.value,
          this.ckeditorService.getValue(),
        );

        this.customerDiscountService.editCustomerDiscount(editData).subscribe((res) => {
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
          this.checkProductHasCustomerDiscount(productId);
        }

      });

    }
    this.existsProductId = true;
    this.existsProductDiscount = false;
  }

  checkProductHasCustomerDiscount(productId: number) {
    this.customerDiscountService.checkProductHasCustomerDiscount(productId).subscribe(res => {

      if (res.data.existsCustomerDiscount === true) {
        this.existsProductDiscount = true
      }

    });
  }
}
