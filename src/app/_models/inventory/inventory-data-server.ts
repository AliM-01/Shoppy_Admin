import {FilterInventoryModel, InventoryModel} from "./_index";
import {InventoryService} from "@app_services/inventory/inventory.service";
export class InventoryDataServer {

  constructor(private inventoryService: InventoryService) { }

  public data: InventoryModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId = 1;

  loadInventories(filterInventories: FilterInventoryModel): void {
    this.isLoadingResults = true;

    this.inventoryService.filterInventory(filterInventories)
      .subscribe((res: FilterInventoryModel) => {
        setTimeout(() => {
          this.data = res.inventories;
          this.resultsLength = res.dataCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;

        }, 750)
      });

  }
}

