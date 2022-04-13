import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDiscountCodeModel } from '@app_models/discount/discount-code/edit-discount-code';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { DiscountCodeService } from '@app_services/discount/discount-code/discount-code.service';
import { LoadingService } from '@loading-service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';

@Component({
  selector: 'app-edit-discount-code',
  templateUrl: './edit-discount-code.dialog.html'
})
export class EditDiscountCodeDialog implements OnInit {

  editForm: FormGroup;
  ckeditorTextValue = null;
  @ViewChild('startDatepickerInput') startDatepickerInput: ElementRef;
  @ViewChild('endDatepickerInput') endDatepickerInput: ElementRef;
  existsDiscountCode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditDiscountCodeDialog>,
    private discountCodeService: DiscountCodeService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.editForm = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
    });

    this.discountCodeService.getDiscountCodeDetails(this.data.id).subscribe(
    (res) => {

      this.editForm.controls.code.setValue(res.code)
      this.editForm.controls.rate.setValue(res.rate)
      this.startDatepickerInput.nativeElement.value = res.startDate;
      this.endDatepickerInput.nativeElement.value = res.endDate;
      this.ckeditorTextValue = res.description;
      this.ckeditorService.setValue(res.description);

    },
    () => this.onCloseClick()
    );
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.editForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.loading.loadingOff();
    this.dialogRef.close();
  }

  submitEditForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (!this.existsDiscountCode) {
      if (this.editForm.valid) {

        const editData = new EditDiscountCodeModel(
          this.data.id,
          this.editForm.controls.code.value,
          this.editForm.controls.rate.value,
          this.startDatepickerInput.nativeElement.value,
          this.endDatepickerInput.nativeElement.value,
          this.ckeditorService.getValue(),
        );

        this.discountCodeService.editDiscountCode(editData).subscribe((res) => {
          if (res.status === 200) {
            this.editForm.reset();
            this.onCloseClick();
          }
        });

      } else {
        this.editForm.markAllAsTouched();
      }
    }
    this.loading.loadingOff();

  }
}
