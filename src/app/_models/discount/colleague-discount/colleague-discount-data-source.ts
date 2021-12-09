import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterColleagueDiscountModel, ColleagueDiscountModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';
import { ColleagueDiscountService } from "@app_services/discount/colleague-discount/colleague-discount.service";

export class ColleagueDiscountDataSource implements DataSource<ColleagueDiscountModel> {

    private ColleagueDiscountsSubject = new BehaviorSubject<ColleagueDiscountModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private colleagueDiscountService: ColleagueDiscountService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<ColleagueDiscountModel[]> {
        return this.ColleagueDiscountsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.ColleagueDiscountsSubject.complete();
        this.loadingSubject.complete();
    }

    loadColleagueDiscounts(filterColleagueDiscounts: FilterColleagueDiscountModel) {

        this.loadingSubject.next(true);

        this.colleagueDiscountService.filterColleagueDiscount(filterColleagueDiscounts)
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(true)))
        .subscribe((res : IResponse<any>) => {
            
            if(res.status === 'success' || res.status === 'no-content'){

                setInterval(() => {
                
                    this.length = res.data.discounts.length;

                    this.ColleagueDiscountsSubject.next(res.data.discounts);
                
                    this.loadingSubject.next(false);
                }, 500)
            }
            
        });

    }    
}

