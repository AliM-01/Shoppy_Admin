import { of } from "rxjs";
import { FilterAccountModel, AccountModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/_common/IResponse';
import { AccountService } from "@app_services/account/account.service";

export class AccountDataServer {

    public data: AccountModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private accountService: AccountService) {}

    load(filter: FilterAccountModel) {

        this.isLoadingResults = true;

        this.accountService.filterAccount(filter)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterAccountModel>) => {
            setTimeout(() => {
                this.data = res.data.accounts;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    }
}

