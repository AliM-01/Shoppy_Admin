import {BasePaging} from '@app_models/_common/_index';
export abstract class BaseDataServer<DataType, FilterType extends BasePaging> {
  data: DataType[];
  resultsLength: number;
  isLoadingResults: boolean;
  pageId: number;

  constructor() {
    this.data = [];
    this.resultsLength = 0;
    this.isLoadingResults = true;
    this.pageId = 1;
  }

  abstract load(filter: FilterType): void;

  loadingOn(): void {
    this.isLoadingResults = true;
  }

  loadingOff(): void {
    this.isLoadingResults = false;
  }
}
