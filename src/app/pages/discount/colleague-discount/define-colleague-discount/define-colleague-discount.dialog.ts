import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DefineColleagueDiscountModel } from '@app_models/discount/colleague-discount/define-colleague-discount';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { checkFormGroupErrors } from '@app_services/common/functions/functions';

@Component({
  selector: 'app-define-colleague-discount',
  templateUrl: './define-colleague-discount.dialog.html',
  providers: [ProductService]
})
export class DefineColleagueDiscountDialog implements OnInit, AfterViewInit {

  defineForm: FormGroup;
  existsProductDiscount: boolean = false;
  existsProductId: boolean = true;
  @ViewChild('productIdInput') productIdInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DefineColleagueDiscountDialog>,
    private colleagueDiscountService: ColleagueDiscountService,
    private productService: ProductService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.defineForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.defineForm, controlName, errorName)
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
          this.checkProductHasDiscount(productId);
        }

      });

    } else {
      this.existsProductId = true;
      this.existsProductDiscount = false;
    }


  }

  checkProductHasDiscount(productId: number) {
    this.colleagueDiscountService.checkProductHasColleagueDiscount(productId).subscribe(res => {

      if (res.data.existsColleagueDiscount === true) {
        this.existsProductDiscount = true
      }

    });
  }
}
