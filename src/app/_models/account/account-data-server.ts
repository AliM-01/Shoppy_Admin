import {FilterAccountModel, AccountModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {AccountService} from "@app_services/account/account.service";
import {BaseDataServer} from "@app_models/_common/BaseDataServer";

export class AccountDataServer extends BaseDataServer<AccountModel, FilterAccountModel> {

  constructor(private accountService: AccountService) {
    super();
  }

  load(filter: FilterAccountModel): void {

    this.loadingOn();

    this.accountService.filterAccount(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterAccountModel) => {
        this.data = res.accounts === undefined ? [] : res.accounts;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;

        this.loadingOff();
      });

  }
}

