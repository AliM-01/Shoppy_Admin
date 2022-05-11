import {FilterOrderModel, OrderModel} from "./_index";
import {OrderService} from "@app_services/order/order.service";
import {BaseDataServer} from '@app_models/_common/_index';
import {finalize} from "rxjs/operators";

export class OrderDataServer extends BaseDataServer<OrderModel, FilterOrderModel>  {

  constructor(private orderService: OrderService) {
    super();
  }

  load(filter: FilterOrderModel): void {
    this.loadingOn();

    this.orderService.filterOrder(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterOrderModel) => {
        this.data = res.orders === undefined ? [] : res.orders;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });

  }
}

