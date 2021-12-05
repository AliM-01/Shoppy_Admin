import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPictureModel } from '@app_models/shop/product-picture/product-picture';
import { ProductPictureService } from '@app_services/shop/product-picture/product-picture.service';
import { CreateProductPictureModel } from '@app_models/shop/product-picture/create-product-picture';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-picture',
  templateUrl: './product-picture.component.html',
  styleUrls: ['./product-picture.component.css'],
  providers: [ProductPictureService]
})
export class ProductPictureComponent implements OnInit {

  productPictures: ProductPictureModel[] = [];
  productPictureBasePath: string = `${environment.productPicutreBaseImagePath}/thumbnail/`;
  productId: number = 0;
  productTitle: string = '';
  pageLoading: boolean = false;
  imageFileToUpload: any;
  fileUploaded: boolean = false;
  createForm: FormGroup;

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productPictureService: ProductPictureService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageTitle.setTitle('گالری تصاویر محصول');

  }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required])
    });

    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;
      const productTitle = params.productTitle;

      if (productId === undefined) {
        this.router.navigate(['/']);
      }
      this.productId = productId;
      this.pageTitle = productTitle;


      this.productPictureService.getProductPictures(this.productId)
        .subscribe((res) => {
          if (res.status === 'success') {

            this.productPictures = res.data.productPictures;
            this.pageLoading = true;

          }
          if (res.status === 'no-content') {

            this.pageLoading = true;

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

    });


  }

  submitCreateForm() {
    if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
      this.fileUploaded = false;
    } else {
      this.fileUploaded = true;
    }

    const createData = new CreateProductPictureModel(
      this.productId,
      this.imageFileToUpload,
      this.createForm.controls.imageAlt.value,
      this.createForm.controls.imageTitle.value
    );

    this.productPictureService.createProductPicture(createData).subscribe((res) => {
      if (res.status === 'success') {

        this.createForm.reset();

        this.ngOnInit();
        
        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success(res.message, 'موفقیت');



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


  }

  getImageFileToUpload(event: any) {
    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;
  }

  removeProductPicture(id: number) {
    this.productPictureService.removeProductPicture(id).subscribe((res) => {
      if (res.status === 'success') {


        this.ngOnInit();

        this.toastr.toastrConfig.tapToDismiss = false;
        this.toastr.toastrConfig.autoDismiss = true;
        this.toastr.toastrConfig.timeOut = 1500;

        this.toastr.success('محصول مورد نظر با موفقیت حذف شد', 'موفقیت');
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
  }

}
