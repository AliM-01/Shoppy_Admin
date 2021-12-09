import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCustomerDiscountModel } from '@app_models/discount/customer-discount/edit-customer-discount';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-customer-discount',
  templateUrl: './edit-customer-discount.dialog.component.html'
})
export class EditCustomerDiscountComponentDialog implements OnInit {

  editForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existsProductDiscount: boolean = false;
  @ViewChild('productIdInput') productIdInput: ElementRef;
  unchangedProductId:number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerDiscountComponentDialog>,
    private customerDiscountService: CustomerDiscountService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required])
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
          this.checkProductHasCustomerDiscount();
        })
      )
      .subscribe();
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitEditForm() {
    this.ckeditorTextValue = this.ckeditorService.getValue();
    
    if(!this.existsProductDiscount){
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
  
            this.toastr.toastrConfig.timeOut = 1500;
  
            this.toastr.success(res.message, 'موفقیت');
  
            this.onCloseClick();
  
          }
        },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              this.toastr.toastrConfig.timeOut = 2500;
  
              this.toastr.error(error.error.message, 'خطا');
            }
          }
        );
  
  
      } else {
        this.editForm.markAllAsTouched();
      }
    }
    

  }
  checkProductHasCustomerDiscount(){

    if(this.editForm.controls.productId.value !== this.unchangedProductId){

      this.customerDiscountService.checkProductHasCustomerDiscount(this.editForm.controls.productId.value).subscribe(res => {
      
        if(res.data.existsCustomerDiscount === true){
          this.toastr.info("برای این محصول یک تخفیف فعال وجود دارد", "اطلاعات");
          this.existsProductDiscount = true
        }
  
      });

    }

    
  }
}
