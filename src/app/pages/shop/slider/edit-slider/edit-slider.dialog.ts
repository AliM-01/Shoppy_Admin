import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditSliderModel } from '@app_models/shop/slider/edit-slider';
import { LoadingService } from '@loading';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-slider',
  templateUrl: './edit-slider.dialog.html'
})
export class EditSliderDialog implements OnInit {
  
  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("ویرایش اسلایدر");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  editForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  imagePath: any;


  constructor(
    public dialogRef: MatDialogRef<EditSliderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private sliderService: SliderService,    
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.loading.loadingOn();

    this.editForm = new FormGroup({
      heading: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      text: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      btnLink: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      btnText: new FormControl(null, [Validators.required, Validators.maxLength(50)])
    });

    this.sliderService.getSliderDetails(this.data.id).subscribe((res) => {

      if (res.status === 'success') {

        this.pageTitleSubject.next(`ویرایش اسلایدر : ${res.data.heading}`);

        this.editForm.controls.heading.setValue(res.data.heading);
        this.editForm.controls.text.setValue(res.data.text);
        this.imagePath = `${environment.sliderBaseImagePath}/original/${res.data.imagePath}`;
        this.editForm.controls.imageAlt.setValue(res.data.imageAlt);
        this.editForm.controls.imageTitle.setValue(res.data.imageTitle);
        this.editForm.controls.btnLink.setValue(res.data.btnLink);
        this.editForm.controls.btnText.setValue(res.data.btnText);

      }
    });

    this.loading.loadingOff();

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

  submiteditForm() {
    this.loading.loadingOn();

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
          this.onCloseClick();

        }
      });

    } else {
      this.editForm.markAllAsTouched();
    }
    this.loading.loadingOff();


  }
}
