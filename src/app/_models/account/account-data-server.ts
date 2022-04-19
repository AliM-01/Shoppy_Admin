import { of } from "rxjs";
import { FilterAccountModel, AccountModel } from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { AccountService } from "@app_services/account/account.service";

export class AccountDataServer {

  public data: AccountModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId: number = 1;

  constructor(private accountService: AccountService) { }

  load(filter: FilterAccountModel) {

    this.isLoadingResults = true;

    this.accountService.filterAccount(filter)
      .pipe(catchError(() => of([])), finalize(() => {
        this.isLoadingResults = true;
      }))
      .subscribe((res: FilterAccountModel) => {
        setTimeout(() => {
          this.data = res.accounts;
          this.resultsLength = res.dataCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;
        }, 750)
      });

  }
}

