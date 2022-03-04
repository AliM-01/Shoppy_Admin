import { of } from "rxjs";
import { FilterDiscountCodeModel, DiscountCodeModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/_common/IResponse';
import { DiscountCodeService } from "@app_services/discount/discount-code/discount-code.service";

export class DiscountCodeDataServer {

    constructor(private discountCodeService: DiscountCodeService) {}

    public data: DiscountCodeModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    loadDiscountCodes(filter: FilterDiscountCodeModel) {

        this.isLoadingResults = true;

        this.discountCodeService.filterDiscountCode(filter)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterDiscountCodeModel>) => {
            setTimeout(() => {
                this.data = res.data.discounts;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    }
}

