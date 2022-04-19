import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { SliderService } from "@app_services/shop/slider/slider.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { SliderModel } from "./_index";
import { catchError, finalize } from 'rxjs/operators';

export class SliderDataSource implements DataSource<SliderModel> {

  private slidersSubject = new BehaviorSubject<SliderModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public loading$ = this.loadingSubject.asObservable();
  public length: number = 0;

  constructor(private sliderService: SliderService) { }

  connect(collectionViewer: CollectionViewer = null): Observable<SliderModel[]> {
    return this.slidersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer = null): void {
    this.slidersSubject.complete();
    this.loadingSubject.complete();
  }

  loadSliders() {

    this.loadingSubject.next(true);

    this.sliderService.getSlidersList()
      .pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(true)))
      .subscribe((res) => {

        setTimeout(() => {

          this.length = res.length;

          this.slidersSubject.next(res);

          this.loadingSubject.next(false);
        }, 500)
      });

  }
}

