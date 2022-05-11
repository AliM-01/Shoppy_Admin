import {FilterInventoryModel, InventoryModel} from "./_index";
import {InventoryService} from "@app_services/inventory/inventory.service";
import {BaseDataServer} from '@app_models/_common/_index';
import {finalize} from 'rxjs/operators';

export class InventoryDataServer extends BaseDataServer<InventoryModel, FilterInventoryModel> {

  constructor(private inventoryService: InventoryService) {
    super();
  }

  load(filter: FilterInventoryModel): void {
    this.loadingOn();

    this.inventoryService.filterInventory(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterInventoryModel) => {
        this.data = res.inventories === undefined ? [] : res.inventories;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }

}

