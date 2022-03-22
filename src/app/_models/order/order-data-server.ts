import { FilterOrderModel, OrderModel } from "./_index";
import { IResponse } from '@app_models/_common/IResponse';
import { OrderService } from "@app_services/order/order.service";

export class OrderDataServer {

    constructor(private orderService: OrderService) { }

    public data: OrderModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    load(filterInventories: FilterOrderModel) {
        this.isLoadingResults = true;

        this.orderService.filterOrder(filterInventories)
        .subscribe((res : IResponse<FilterOrderModel>) => {
            if (res.status === 'success' || res.status === 'no-content') {
                setTimeout(() => {
                    this.data = res.data.orders;
                    this.resultsLength = res.data.allPagesCount;
                    this.isLoadingResults = false;
                    this.pageId = res.data.pageId;

                }, 750)
            }
        });

    }
}

