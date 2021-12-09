import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DefineColleagueDiscountModel } from '@app_models/discount/colleague-discount/define-colleague-discount';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-define-colleague-discount',
  templateUrl: './define-colleague-discount.component.html'
})
export class DefineColleagueDiscountComponent implements OnInit {

  defineForm: FormGroup;
  existsProductDiscount: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DefineColleagueDiscountComponent>,
    private colleagueDiscountService: ColleagueDiscountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.defineForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
    });

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitDefineForm() {

    this.colleagueDiscountService.checkProductHasColleagueDiscount(this.defineForm.controls.productId.value).subscribe(res => {
      
      if(res.data.existsColleagueDiscount === true){
        this.toastr.info("برای این محصول یک تخفیف فعال وجود دارد", "اطلاعات");
        this.existsProductDiscount = true
      }

    });

    if(!this.existsProductDiscount){

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
}
