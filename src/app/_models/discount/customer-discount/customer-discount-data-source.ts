import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterCustomerDiscountModel, CustomerDiscountModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';
import { CustomerDiscountService } from "@app_services/discount/customer-discount/customer-discount.service";

export class CustomerDiscountDataSource implements DataSource<CustomerDiscountModel> {

    private customerDiscountsSubject = new BehaviorSubject<CustomerDiscountModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public length : number = 0;

    constructor(private customerDiscountService: CustomerDiscountService) {}

    connect(collectionViewer: CollectionViewer=null): Observable<CustomerDiscountModel[]> {
        return this.customerDiscountsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer=null): void {
        this.customerDiscountsSubject.complete();
        this.loadingSubject.complete();
    }

    loadCustomerDiscounts(filterCustomerDiscounts: FilterCustomerDiscountModel) {

        this.loadingSubject.next(true);

        this.customerDiscountService.filterCustomerDiscount(filterCustomerDiscounts)
        .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(true)))
        .subscribe((res : IResponse<any>) => {
            
            if(res.status === 'success' || res.status === 'no-content'){

                setInterval(() => {
                
                    this.length = res.data.discounts.length;

                    this.customerDiscountsSubject.next(res.data.discounts);
                
                    this.loadingSubject.next(false);
                }, 500)
            }
            
        });

    }    
}

