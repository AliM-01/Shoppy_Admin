import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DefineCustomerDiscountModel } from '@app_models/discount/customer-discount/define-customer-discount';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-define-customer-discount',
  templateUrl: './define-customer-discount.dialog.html',
  providers: [ProductService]
})
export class DefineCustomerDiscountDialog implements OnInit, AfterViewInit {

  defineForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existsProductId: boolean = true;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DefineCustomerDiscountDialog>,
    private customerDiscountService: CustomerDiscountService,
    private productService: ProductService,
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.defineForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });
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
    this.dialogRef.close();
  }

  submitDefineForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();
    this.checkProductId();

    if (!this.existsProductDiscount) {

      if (this.defineForm.valid) {

        const defineData = new DefineCustomerDiscountModel(
          this.defineForm.controls.productId.value,
          this.defineForm.controls.rate.value,
          this.startDatepickerInput.nativeElement.value,
          this.endDatepickerInput.nativeElement.value,
          this.ckeditorService.getValue(),
        );

        this.customerDiscountService.defineCustomerDiscount(defineData).subscribe((res) => {
          if (res.status === 'success') {

            this.defineForm.reset();
            this.onCloseClick();

          }
        });


      } else {
        this.defineForm.markAllAsTouched();
      }

    }
    this.loading.loadingOff();

  }

  checkProductId() {

    let productId = this.defineForm.controls.productId.value;

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
