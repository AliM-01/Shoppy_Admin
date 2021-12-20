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
import { ProductService } from '@app_services/shop/product/product.service';

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
  unchangedProductId:number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditCustomerDiscountDialog>,
    private customerDiscountService: CustomerDiscountService,
    private productService: ProductService,
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
          this.checkProductId();
        })
      )
      .subscribe();
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitEditForm() {
    this.ckeditorTextValue = this.ckeditorService.getValue();
    this.checkProductId();

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

  checkProductId(){

    let productId = this.editForm.controls.productId.value;

    if(productId !== null) {
      if(productId !== this.unchangedProductId){

        this.productService.existsProductId(productId).subscribe(res => {

          if(res.data.exists === false){
            this.toastr.error("محصولی با این شناسه وجود ندارد", "خطا", {timeOut: 500});
            this.existsProductId = true

          } else {

            this.customerDiscountService.checkProductHasCustomerDiscount(productId).subscribe(res => {
        
              if(res.data.existsCustomerDiscount === true){
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
