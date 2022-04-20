import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {InventoryService} from "@app_services/inventory/inventory.service";
import {EditInventoryModel} from '@app_models/inventory/edit-inventory';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '@app_services/shop/product/product.service';
import {GetInventoryOperationsModel} from '@app_models/inventory/get-inventory-operations';
import {EditInventoryDialog} from '../edit-inventory/edit-inventory.dialog';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.page.html'
})
export class InventoryDetailsPage implements OnInit {

  inventoryId = '';
  inventory: EditInventoryModel;
  productTitle = '';

  operations: GetInventoryOperationsModel;

  constructor(
    private pageTitle: Title,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private inventoryService: InventoryService
  ) {
    this.pageTitle.setTitle('جزییات انبار محصول');
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.inventoryId = params.id;

      if (this.inventoryId === undefined) {
        this.router.navigate(['/inventory']);
      }

      this.getInventory();
      this.setProductTitle();
      this.getOperations();

    });

  }

  getInventory(): void {
    this.inventoryService.getInventoryDetails(this.inventoryId)
      .subscribe((res) => this.inventory = res);
  }

  setProductTitle(): void{
    this.productService.existsProductId(this.inventory.productId).subscribe((res) => {

      this.pageTitle.setTitle(`ویرایش انبار محصول : ${res.productTitle}`);
      this.productTitle = res.productTitle;
    });
  }

  getOperations(): void {
    this.inventoryService.getInventoryOperationLog(this.inventoryId)
      .subscribe((res) => this.operations = res);
  }

  openEditDialog(): void {
    this.dialog.open(EditInventoryDialog, {
      width: '450px',
      height: '425px',
      data: {
        id: this.inventoryId
      }
    }).afterClosed().subscribe(result => {
      if (!result)
        return;

      this.router.navigate(['/inventory']);

    });
  }

}
