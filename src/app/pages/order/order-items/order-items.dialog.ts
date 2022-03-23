import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '@app_services/order/order.service';
import { environment } from '@environments/environment';
import { LoadingService } from '@loading';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItemModel } from '../../../_models/order/order-item';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.dialog.html'
})
export class OrderItemsDialog implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("آیتم های سفارش");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  items: OrderItemModel[] = [];
  thumbnailBasePath: string = `${environment.productBaseImagePath}/thumbnail/`;

  constructor(
    public dialogRef: MatDialogRef<OrderItemsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private orderService: OrderService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.pageTitleSubject.next(`آیتم های سفارش : ${this.data.id}`);

    this.getItems()

    this.loading.loadingOff();

  }

  getItems(){
    this.orderService.getItems(this.data.id).subscribe((res) => {
      if (res.status === 'success') {
        this.items = res.data;
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
