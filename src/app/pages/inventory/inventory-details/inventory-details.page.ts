import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { InventoryService } from "@app_services/inventory/inventory.service";
import { EditInventoryModel } from '@app_models/inventory/edit-inventory';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app_services/shop/product/product.service';
import { GetInventoryOperationsModel } from '@app_models/inventory/get-inventory-operations';
import { EditInventoryDialog } from '../edit-inventory/edit-inventory.dialog';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.page.html'
})
export class InventoryDetailsPage implements OnInit {

  inventoryId: string = '';
  inventory: EditInventoryModel;
  productTitle: string = '';

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
      this.getOperations();

    });

  }

  getInventory() {
    this.inventoryService.getInventoryDetails(this.inventoryId).subscribe((iRes) => {

      if (iRes.status === 'success') {

        this.inventory = iRes.data;

        this.productService.existsProductId(this.inventory.productId).subscribe((pRes) => {

          this.pageTitle.setTitle(`ویرایش انبار محصول : ${pRes.data.productTitle}`);
          this.productTitle = pRes.data.productTitle;
        });
      }
    });
  }

  getOperations() {
    this.inventoryService.getInventoryOperationLog(this.inventoryId).subscribe((res) => {
      if (res.status === 'success') {
        this.operations = res.data;
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditInventoryDialog, {
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
