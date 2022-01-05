import { FilterInventoryModel, InventoryModel } from "./_index";
import { IResponse } from '@app_models/common/IResponse';
import { InventoryService } from "@app_services/inventory/inventory.service";
export class InventoryDataServer {

    constructor(private inventoryService: InventoryService) { }

    public data: InventoryModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    loadInventories(filterInventories: FilterInventoryModel) {
        this.isLoadingResults = true;

        this.inventoryService.filterInventory(filterInventories)
        .subscribe((res : IResponse<FilterInventoryModel>) => {
            if (res.status === 'success' || res.status === 'no-content') {
                setTimeout(() => {
                    this.data = res.data.inventories;
                    this.resultsLength = res.data.allPagesCount;
                    this.isLoadingResults = false;
                    this.pageId = res.data.pageId;

                }, 750)
            }
        });

    } 
}

