import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditColleagueDiscountModel } from '@app_models/discount/colleague-discount/edit-colleague-discount';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-colleague-discount',
  templateUrl: './edit-colleague-discount.dialog.html',
  providers: [ProductService]
})
export class EditColleagueDiscountDialog implements OnInit {

  editForm: FormGroup;
  existsProductId: boolean = true;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;
  unchangedProductId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditColleagueDiscountDialog>,
    private productService: ProductService,
    private colleagueDiscountService: ColleagueDiscountService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private loading: LoadingService

  ) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });

    this.colleagueDiscountService.getColleagueDiscountDetails(this.data.id).subscribe((res) => {

      if (res.status === 'success') {

        this.unchangedProductId = res.data.productId;
        this.editForm.controls.productId.setValue(res.data.productId);
        this.editForm.controls.rate.setValue(res.data.rate);

      }
    });
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
    this.dialogRef.close();
  }

  submitEditForm() {

    this.loading.loadingOn();

    this.checkProductId()
    if (this.editForm.valid) {

      const editData = new EditColleagueDiscountModel(
        this.data.id,
        this.editForm.controls.productId.value,
        this.editForm.controls.rate.value
      );

      this.colleagueDiscountService.editColleagueDiscount(editData).subscribe((res) => {
        if (res.status === 'success') {
          this.editForm.reset();
          this.onCloseClick();
        }
      });

    } else {
      this.editForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

  checkProductId() {
    let productId = this.editForm.controls.productId.value;

    if (productId !== null) {
      if (productId !== this.unchangedProductId) {

        this.productService.existsProductId(productId).subscribe(res => {

          if (res.data.exists === false) {
            this.existsProductId = false

          } else {
            this.checkProductHasDiscount(productId);
          }

        })


      }
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
