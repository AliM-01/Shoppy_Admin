import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditColleagueDiscountModel } from '@app_models/discount/colleague-discount/edit-colleague-discount';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-colleague-discount',
  templateUrl: './edit-colleague-discount.component.html'
})
export class EditColleagueDiscountComponent implements OnInit {

  editForm: FormGroup;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EditColleagueDiscountComponent>,
    private colleagueDiscountService: ColleagueDiscountService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
    });

    this.colleagueDiscountService.getColleagueDiscountDetails(this.data.id).subscribe((res) => {
      
      if (res.status === 'success') {

        this.editForm.controls.productId.setValue(res.data.productId)
        this.editForm.controls.rate.setValue(res.data.rate)

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
          this.checkProductHasColleagueDiscount();
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

  checkProductHasColleagueDiscount(){
    this.colleagueDiscountService.checkProductHasColleagueDiscount(this.editForm.controls.productId.value).subscribe(res => {
      
      if(res.data.existsColleagueDiscount === true){
        this.toastr.info("برای این محصول یک تخفیف فعال وجود دارد", "اطلاعات");
        this.existsProductDiscount = true
      }

    });
  }
}
