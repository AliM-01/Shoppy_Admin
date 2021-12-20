import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { FilterInventoryModel, InventoryModel } from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/common/IResponse';
import { InventoryService } from "@app_services/inventory/inventory.service";
export class InventoryDataSource implements DataSource<InventoryModel> {

    private InventorysSubject = new BehaviorSubject<InventoryModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(true);

    public loading$ = this.loadingSubject.asObservable();
    public length: number = 0;

    constructor(private inventoryService: InventoryService) { }

    connect(collectionViewer: CollectionViewer = null): Observable<InventoryModel[]> {
        return this.InventorysSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer = null): void {
        this.InventorysSubject.complete();
        this.loadingSubject.complete();
    }

    loadInventories(filterInventory: FilterInventoryModel) {

        this.loadingSubject.next(true);

        this.inventoryService.filterInventory(filterInventory)
            .pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(true)))
            .subscribe((res: IResponse<any>) => {

                if (res.status === 'success' || res.status === 'no-content') {

                    this.length = res.data.inventories.length;

                    this.InventorysSubject.next(res.data.inventories);

                    this.loadingSubject.next(false);
                }

            });

    }
}

