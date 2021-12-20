import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditSliderModel } from '@app_models/shop/slider/edit-slider';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-slider',
  templateUrl: './edit-slider.dialog.html'
})
export class EditSliderDialog implements OnInit {

  editForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  imagePath: any;


  constructor(
    public dialogRef: MatDialogRef<EditSliderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private sliderService: SliderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      heading: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required]),
      btnLink: new FormControl(null, [Validators.required]),
      btnText: new FormControl(null, [Validators.required])
    });

    this.sliderService.getSliderDetails(this.data.id).subscribe((res) => {

      if (res.status === 'success') {

        this.editForm.controls.heading.setValue(res.data.heading);
        this.editForm.controls.text.setValue(res.data.text);
        this.imagePath = `${environment.sliderBaseImagePath}/original/${res.data.imagePath}`;
        this.editForm.controls.imageAlt.setValue(res.data.imageAlt);
        this.editForm.controls.imageTitle.setValue(res.data.imageTitle);
        this.editForm.controls.btnLink.setValue(res.data.btnLink);
        this.editForm.controls.btnText.setValue(res.data.btnText);

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.onCloseClick();
          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        }
      }
    );
  }

  getImageFileToUpload(event: any) {
    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submiteditForm() {
    if (this.editForm.valid) {

      if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
      }

      const editData = new EditSliderModel(
        this.data.id,
        this.editForm.controls.heading.value,
        this.editForm.controls.text.value,
        this.imageFileToUpload,
        this.fileUploaded,
        this.imagePath,
        this.editForm.controls.imageAlt.value,
        this.editForm.controls.imageTitle.value,
        this.editForm.controls.btnLink.value,
        this.editForm.controls.btnText.value
      );

      this.sliderService.editSlider(editData).subscribe((res) => {
        if (res.status === 'success') {

          this.editForm.reset();
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
      this.editForm.markAllAsTouched();
    }

  }
}
