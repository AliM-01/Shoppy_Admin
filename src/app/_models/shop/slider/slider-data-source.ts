import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { SliderService } from "@app_services/shop/slider/slider.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { SliderModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/_common/IResponse';

export class SliderDataSource implements DataSource<SliderModel> {

    private slidersSubject = new BehaviorSubject<SliderModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private sliderService: SliderService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<SliderModel[]> {
        return this.slidersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.slidersSubject.complete();
        this.loadingSubject.complete();
    }

    loadSliders() {

        this.loadingSubject.next(true);

        this.sliderService.getSlidersList()
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(true)))
        .subscribe((res : IResponse<any>) => {
            
            setTimeout(() => {
                
                this.length = res.data.length;

                this.slidersSubject.next(res.data);
                
                this.loadingSubject.next(false);
            }, 500)
        });

    }    
}

