import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DefineDiscountCodeModel } from '@app_models/discount/discount-code/define-discount-code';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
import { DiscountCodeService } from '@app_services/discount/discount-code/discount-code.service';

@Component({
  selector: 'app-define-discount-code',
  templateUrl: './define-discount-code.dialog.html'
})
export class DefineDiscountCodeDialog implements OnInit {

  defineForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existscode: boolean = true;
  existsDiscountCode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DefineDiscountCodeDialog>,
    private DiscountCodeService: DiscountCodeService,
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.defineForm = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.defineForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitDefineForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (!this.existsDiscountCode) {

      if (this.defineForm.valid) {

        const defineData = new DefineDiscountCodeModel(
          this.defineForm.controls.code.value,
          this.defineForm.controls.rate.value,
          this.startDatepickerInput.nativeElement.value,
          this.endDatepickerInput.nativeElement.value,
          this.ckeditorService.getValue(),
        );

        this.DiscountCodeService.defineDiscountCode(defineData).subscribe((res) => {
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
}
