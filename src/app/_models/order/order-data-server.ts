import { FilterOrderModel, OrderModel } from "./_index";
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
      .subscribe((res: FilterOrderModel) => {
        setTimeout(() => {
          this.data = res.orders;
          this.resultsLength = res.allPagesCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;

        }, 750)
      });

  }
}

