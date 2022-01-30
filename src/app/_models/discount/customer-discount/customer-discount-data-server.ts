import { of } from "rxjs";
import { FilterCustomerDiscountModel, CustomerDiscountModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/_common/IResponse';
import { CustomerDiscountService } from "@app_services/discount/customer-discount/customer-discount.service";

export class CustomerDiscountDataServer {

    constructor(private customerDiscountService: CustomerDiscountService) {}

    public data: CustomerDiscountModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    loadCustomerDiscounts(filterProducts: FilterCustomerDiscountModel) {

        this.isLoadingResults = true;

        this.customerDiscountService.filterCustomerDiscount(filterProducts)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterCustomerDiscountModel>) => {
            setTimeout(() => {
                this.data = res.data.discounts;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    }  
}

