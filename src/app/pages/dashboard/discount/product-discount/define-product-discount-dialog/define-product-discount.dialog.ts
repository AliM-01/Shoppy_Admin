import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {DefineProductDiscountModel} from '@app_models/discount/product-discount/define-product-discount';
import {CkeditorService} from '@app_services/_common/ckeditor/ckeditor.service';
import {checkFormGroupErrors} from '@app_services/_common/functions/functions';
import {LoadingService} from '@loading-service';
import {ProductDiscountService} from '@app_services/discount/product-discount/product-discount.service';
import {ProductService} from '@app_services/shop/product/product.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-define-product-discount',
  templateUrl: './define-product-discount.dialog.html',
  providers: [ProductService]
})
export class DefineProductDiscountDialog implements OnInit, AfterViewInit {

  defineForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existsProductId = true;
  existsProductDiscount = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DefineProductDiscountDialog>,
    private productDiscountService: ProductDiscountService,
    private productService: ProductService,
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.defineForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.defineForm, controlName, errorName)
  }

  ngAfterViewInit(): void {

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
    this.dialogRef.close();
  }

  submit(): void {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();
    this.checkProductId();

    if (!this.existsProductDiscount) {

      if (this.defineForm.valid) {

        const defineData = new DefineProductDiscountModel(
          this.defineForm.controls.productId.value,
          this.defineForm.controls.rate.value,
          this.startDatepickerInput.nativeElement.value,
          this.endDatepickerInput.nativeElement.value,
          this.ckeditorService.getValue()
        );

        this.productDiscountService.defineProductDiscount(defineData).subscribe((res) => {
          if (res.status === 200) {

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

  checkProductId(): void {

    const productId = this.defineForm.controls.productId.value;

    if (productId !== null) {

      this.productService.existsProductId(productId).subscribe(res => {

        if (!res.exists) {
          this.existsProductId = false

        } else {
          this.checkProductHasProductDiscount(productId);
        }

      });

    }
    this.existsProductId = true;
    this.existsProductDiscount = false;
  }

  checkProductHasProductDiscount(productId: string): void {
    this.productDiscountService.checkProductHasProductDiscount(productId).subscribe(res => {

      if (res.existsProductDiscount) {
        this.existsProductDiscount = true
      }

    });
  }
}
