import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefineCustomerDiscountModel } from '@app_models/discount/customer-discount/define-customer-discount';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '@loading';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';

@Component({
  selector: 'app-define-customer-discount',
  templateUrl: './define-customer-discount.page.html'
})
export class DefineCustomerDiscountPage implements OnInit {

  defineForm: FormGroup;
  ckeditorTextValue = null;
  productId: number = 0;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  
  constructor(
    private customerDiscountService: CustomerDiscountService,
    private ckeditorService: CkeditorService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private pageTitle: Title,
    private _location: Location,
    private loading: LoadingService
  ) { 
    this.pageTitle.setTitle('تعریف تخفیف محصول');
  }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.ckeditorService.initCkeditor();

    this.activatedRoute.params.subscribe(params => {
      this.productId = params.productId;

      if (this.productId === undefined) {
          this.route.navigate(['/customer-discount']);
      }

      this.customerDiscountService.checkProductHasCustomerDiscount(this.productId).subscribe(res => {
        if(res.data.existsCustomerDiscount === true){
          this.onCloseClick();
        }
      });
      
    });

    this.defineForm = new FormGroup({
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.defineForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.loading.loadingOff();
    this._location.back();
  }

  submitDefineForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();
    
    if (this.defineForm.valid) {

      const defineData = new DefineCustomerDiscountModel(
        this.productId,
        this.defineForm.controls.rate.value,
        this.startDatepickerInput.nativeElement.value,
        this.endDatepickerInput.nativeElement.value,
        this.ckeditorService.getValue(),
      );

      this.customerDiscountService.defineCustomerDiscount(defineData).subscribe((res) => {
        if (res.status === 'success') {
          this.defineForm.reset();
        }
      });


    } else {
      this.defineForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }
}
