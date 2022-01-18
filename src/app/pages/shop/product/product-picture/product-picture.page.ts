import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPictureModel } from '@app_models/shop/product-picture/product-picture';
import { ProductPictureService } from '@app_services/shop/product-picture/product-picture.service';
import { CreateProductPictureModel } from '@app_models/shop/product-picture/create-product-picture';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { checkFormGroupErrors } from '@app_services/common/functions/functions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-picture',
  templateUrl: './product-picture.page.html',
  styleUrls: ['./product-picture.page.css'],
  providers: [ProductPictureService]
})
export class ProductPicturePage implements OnInit {

  productPictures: ProductPictureModel[] = [];
  productPictureBasePath: string = `${environment.productPicutreBaseImagePath}/thumbnail/`;
  productId: number = 0;
  productTitle: string = '';
  pageLoading: boolean = false;
  baseShopUrl = `${environment.shopBaseApiUrl}/product-picture/create`;
  
  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private productPictureService: ProductPictureService,
    private toastr: ToastrService,
    private router: Router,
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageTitle.setTitle('گالری تصاویر محصول');

  }

  ngOnInit(): void {

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

            this.productPictures = res.data;
            this.pageLoading = true;

          }
          if (res.status === 'no-content') {

            this.pageLoading = true;

          }
        });

    });


  }

  onUploadFiles(event: any) {

    this.toastr.success("فایل ها با موفقیت آپلود شدند", "موفقیت")
    this.ngOnInit();

  }

  onUploadError(event: any) {
    this.toastr.error("عملیات با خطا مواجه شد", "خطا")
  }

  removeProductPicture(id: number) {
    this.productPictureService.removeProductPicture(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

}
