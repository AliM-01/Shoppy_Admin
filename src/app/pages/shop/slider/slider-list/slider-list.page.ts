import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { SliderDataSource } from '@app_models/shop/slider/slider-data-source';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { CreateSliderComponent } from '../create-slider/create-slider.component';
import { EditSliderComponent } from '../edit-slider/edit-slider.component';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html'
})
export class SliderListPage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'thumbnailImage', 'heading', 'text', 'state', 'creationDate', 'commands'];
  dataSource: SliderDataSource;
  thumbnailBasePath: string = `${environment.sliderBaseImagePath}/thumbnail/`;

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private sliderService: SliderService,
    private toastr: ToastrService
  ) {
    this.pageTitle.setTitle('مدیریت دسته بندی محصولات');
  }
  
  ngOnInit(): void {
    this.dataSource = new SliderDataSource(this.sliderService);
    this.dataSource.loadSliders();
  }

  ngAfterViewInit() {

    this.paginator.page
      .pipe(
        tap(() => this.loadSlidersPage())
      )
      .subscribe();

  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateSliderComponent, {
      width: '600px',
      height: '700px'
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

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

  loadSlidersPage() {
    this.dataSource.loadSliders();
  }

  removeSlider(id: number) {
    this.sliderService.removeSlider(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();          
        this.toastr.success(res.message, 'موفقیت', {timeOut: 1500});
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        }
      }
    );
  }

  restoreSlider(id: number) {
    this.sliderService.restoreSlider(id).subscribe((res) => {
      if (res.status === 'success') {
        this.ngOnInit();
        this.toastr.success(res.message, 'موفقیت', {timeOut: 1500});
      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        }
      }
    );
  }

}
