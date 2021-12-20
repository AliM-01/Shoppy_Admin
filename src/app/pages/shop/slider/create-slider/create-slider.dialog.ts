import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateSliderModel } from '@app_models/shop/slider/create-slider';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-slider',
  templateUrl: './create-slider.dialog.html'
})
export class CreateSliderDialog implements OnInit {

  createForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;

  constructor(
    public dialogRef: MatDialogRef<CreateSliderDialog>,
    private sliderService: SliderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      heading: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required]),
      btnLink: new FormControl(null, [Validators.required]),
      btnText: new FormControl(null, [Validators.required])
    });
  }

  getImageFileToUpload(event: any) {
    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {
    if (this.createForm.valid) {

      if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
      }

      const createData = new CreateSliderModel(
        this.createForm.controls.heading.value,
        this.createForm.controls.text.value,
        this.imageFileToUpload,
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.btnLink.value,
        this.createForm.controls.btnText.value
      );

      this.sliderService.createSlider(createData).subscribe((res) => {
        if (res.status === 'success') {

          this.createForm.reset();
          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.onCloseClick();

        }
      },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          }
        }
      );


    } else {
      this.createForm.markAllAsTouched();
    }

  }
}
