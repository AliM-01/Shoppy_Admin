import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPictureModel } from '@app_models/shop/product-picture/product-picture';
import { ProductPictureService } from '@app_services/shop/product-picture/product-picture.service';
import { LoadingService } from '@loading-service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product-picture',
  templateUrl: './product-picture.page.html',
  styleUrls: ['./product-picture.page.css'],
  providers: [ProductPictureService]
})
export class ProductPicturePage implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("گالری تصاویر محصول");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  productPictures: ProductPictureModel[] = [];
  productPictureBasePath: string = `${environment.productPictureBaseImagePath}/thumbnail/`;
  productId: string = "";
  pageLoading: boolean = false;
  baseShopUrl = `${environment.shopBaseApiUrl}/product-picture/create`;

  constructor(
    private title: Title,
    public dialog: MatDialog,
    private productPictureService: ProductPictureService,
    private toastr: ToastrService,
    private router: Router,
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title.setTitle('گالری تصاویر محصول');

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;

      if (productId === undefined) {
        this.router.navigate(['/']);
      }
      this.productId = productId;


      this.productPictureService.getProductPictures(this.productId)
        .subscribe((res) => {
          console.log(res);

          if (res.status === 'success') {

            this.title.setTitle(`گالری تصاویر محصول : ${res.data[0].product}`);
            this.pageTitleSubject.next(`گالری تصاویر محصول : ${res.data[0].product}`);

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

  removeProductPicture(id: string) {
    this.productPictureService.removeProductPicture(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
      }
    });
  }

}
