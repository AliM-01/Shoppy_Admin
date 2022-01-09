import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateSliderModel } from '@app_models/shop/slider/create-slider';
import { checkFormGroupErrors } from '@app_services/common/functions/functions';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { SliderService } from '@app_services/shop/slider/slider.service';

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
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      heading: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      text: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      btnLink: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      btnText: new FormControl(null, [Validators.required, Validators.maxLength(50)])
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.createForm, controlName, errorName)
  }

  getImageFileToUpload(event: any) {
    this.loading.loadingOn();

    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;

    this.loading.loadingOff();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {
    this.loading.loadingOn();

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
          this.onCloseClick();
        }
      });

    } else {
      this.createForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }
}
