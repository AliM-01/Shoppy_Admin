import { of } from "rxjs";
import { FilterColleagueDiscountModel, ColleagueDiscountModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';
import { ColleagueDiscountService } from "@app_services/discount/colleague-discount/colleague-discount.service";

export class ColleagueDiscountDataServer {

    public data: ColleagueDiscountModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private colleagueDiscountService: ColleagueDiscountService) {}

    loadColleagueDiscounts(filterProducts: FilterColleagueDiscountModel) {

        this.isLoadingResults = true;

        this.colleagueDiscountService.filterColleagueDiscount(filterProducts)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterColleagueDiscountModel>) => {
            setTimeout(() => {
                this.data = res.data.discounts;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    }  
}

