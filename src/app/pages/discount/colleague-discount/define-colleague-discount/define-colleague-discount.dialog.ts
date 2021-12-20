import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DefineColleagueDiscountModel } from '@app_models/discount/colleague-discount/define-colleague-discount';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-define-colleague-discount',
  templateUrl: './define-colleague-discount.dialog.html',
  providers: [ProductService]
})
export class DefineColleagueDiscountDialog implements OnInit, AfterViewInit {

  defineForm: FormGroup;
  existsProductDiscount: boolean = false;
  existsProductId: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DefineColleagueDiscountDialog>,
    private colleagueDiscountService: ColleagueDiscountService,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.defineForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
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

    this.checkProductId();

    if (!this.existsProductDiscount) {

      if (this.defineForm.valid) {

        const defineData = new DefineColleagueDiscountModel(
          this.defineForm.controls.productId.value,
          this.defineForm.controls.rate.value
        );



        this.colleagueDiscountService.defineColleagueDiscount(defineData).subscribe((res) => {
          if (res.status === 'success') {

            this.defineForm.reset();

            this.toastr.toastrConfig.tapToDismiss = false;
            this.toastr.toastrConfig.autoDismiss = true;
            this.toastr.toastrConfig.timeOut = 1500;

            this.toastr.success(res.message, 'موفقیت');

            this.onCloseClick();

          }
        },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              this.toastr.toastrConfig.tapToDismiss = false;
              this.toastr.toastrConfig.autoDismiss = true;
              this.toastr.toastrConfig.timeOut = 2500;

              this.toastr.error(error.error.message, 'خطا');
            }
          }
        );


      } else {
        this.defineForm.markAllAsTouched();
      }

    }



  }

  checkProductId() {

    let productId = this.defineForm.controls.productId.value;

    if (productId !== null) {

      this.productService.existsProductId(productId).subscribe(res => {

        if (res.data.exists === false) {
          this.toastr.error("محصولی با این شناسه وجود ندارد", "خطا", { timeOut: 500 });
          this.existsProductId = true

        } else {

          this.colleagueDiscountService.checkProductHasColleagueDiscount(productId).subscribe(res => {

            if (res.data.existsColleagueDiscount === true) {
              this.toastr.info("برای این محصول یک تخفیف فعال وجود دارد", "اطلاعات", { timeOut: 500 });
              this.existsProductDiscount = true
            }

          });

        }

      })


    }
    this.existsProductId = false;
    this.existsProductDiscount = false;


  }
}
