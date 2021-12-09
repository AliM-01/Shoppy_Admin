import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditColleagueDiscountModel } from '@app_models/discount/colleague-discount/edit-colleague-discount';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-colleague-discount',
  templateUrl: './edit-colleague-discount.component.html',
  providers: [ProductService]
})
export class EditColleagueDiscountComponent implements OnInit {

  editForm: FormGroup;
  existsProductId: boolean = false;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;
  unchangedProductId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditColleagueDiscountComponent>,
    private productService: ProductService,
    private colleagueDiscountService: ColleagueDiscountService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
    });

    this.colleagueDiscountService.getColleagueDiscountDetails(this.data.id).subscribe((res) => {

      if (res.status === 'success') {

        this.unchangedProductId = res.data.productId;
        this.editForm.controls.productId.setValue(res.data.productId);
        this.editForm.controls.rate.setValue(res.data.rate);

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.onCloseClick();

          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 2500;

          this.toastr.error(error.error.message, 'خطا');
        }
      }
    );
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

    if (this.editForm.valid) {

      const editData = new EditColleagueDiscountModel(
        this.data.id,
        this.editForm.controls.productId.value,
        this.editForm.controls.rate.value
      );

      this.colleagueDiscountService.editColleagueDiscount(editData).subscribe((res) => {
        if (res.status === 'success') {

          this.editForm.reset();

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
      this.editForm.markAllAsTouched();
    }

  }

  checkProductId() {
    let productId = this.editForm.controls.productId.value;

    if(productId !== null) {
      if(productId !== this.unchangedProductId){

        this.productService.existsProductId(productId).subscribe(res => {

          if(res.data.exists === false){
            this.toastr.info("محصولی با این شناسه وجود ندارد", "خطا", {timeOut: 500});
            this.existsProductId = true

          } else {

            this.colleagueDiscountService.checkProductHasColleagueDiscount(productId).subscribe(res => {
        
              if(res.data.existsColleagueDiscount === true){
                this.toastr.info("برای این محصول یک تخفیف فعال وجود دارد", "اطلاعات", {timeOut: 500});
                this.existsProductDiscount = true
              }
        
            });
      
          }

        })

       
      }
    }
    this.existsProductId = false;
    this.existsProductDiscount = false;

  }
}
