import {BasePaging} from '@app_models/_common/_index';
export abstract class BaseDataServer<DataType, FilterType extends BasePaging> {
  public data: DataType[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId = 1;

  abstract load(filter: FilterType): void;
}
