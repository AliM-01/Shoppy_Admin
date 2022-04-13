import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@app_services/order/order.service';
import { environment } from '@environments/environment';
import { LoadingService } from '@loading-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItemModel } from '@app_models/order/order-item';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.page.html'
})
export class OrderItemsPage implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("آیتم های سفارش");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  items: OrderItemModel[] = [];
  thumbnailBasePath: string = `${environment.productBaseImagePath}/thumbnail/`;
  orderId: string = '';

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.activatedRoute.params.subscribe(params => {
      this.orderId = params.id;

      if (this.orderId === undefined) {
        this.router.navigate(['/order']);
      }

      this.title.setTitle(`آیتم های سفارش : ${this.orderId}`);
      this.pageTitleSubject.next(`آیتم های سفارش : ${this.orderId}`);

      this.getItems();

    });

    this.loading.loadingOff();

  }

  getItems(){
    this.orderService.getItems(this.orderId).subscribe((res) => this.items = res);
  }

  onCloseClick(): void {
    this.router.navigate(['/order']);
  }

}
