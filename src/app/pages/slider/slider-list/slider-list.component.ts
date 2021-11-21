import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { SliderDataSource } from '@app_models/slider/slider-data-source';
import { SliderService } from '@app_services/slider/slider.service';
import { CreateSliderComponent } from '../create-slider/create-slider.component';
import { EditSliderComponent } from '../edit-slider/edit-slider.component';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html'
})
export class SliderListComponent implements OnInit, AfterViewInit {

  //#region properties

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'heading', 'text', 'creationDate', 'commands'];
  dataSource: SliderDataSource;
  thumbnailBasePath: string = `${environment.sliderBaseImagePath}/thumbnail/`;

  //#endregion

  //#region Ctor

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private sliderService: SliderService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت دسته بندی محصولات');
  }

  //#endregion

  //#region ngOnInit

  ngOnInit(): void {
    this.dataSource = new SliderDataSource(this.sliderService);
    this.dataSource.loadSliders();
  }

  //#endregion

  //#region ngAfterViewInit

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => this.loadSlidersPage())
      )
      .subscribe();

  }

  //#endregion

  //#region openCreateDialog

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateSliderComponent, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  //#endregion

  //#region openEditDialog

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditSliderComponent, {
      width: '600px',
      height: '700px',
      data: {
        id: id
      }
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  //#endregion

  //#region loadSlidersPage

  loadSlidersPage() {
    this.dataSource.loadSliders();
  }

  //#endregion

  //#region removeSlider

  removeSlider(id: number) {
    this.sliderService.removeSlider(id).subscribe((res) => {
      if (res.status === 'success') {


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

  //#endregion

  //#region restoreSlider

  restoreSlider(id: number) {
    this.sliderService.restoreSlider(id).subscribe((res) => {
      if (res.status === 'success') {


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

  //#endregion
}
