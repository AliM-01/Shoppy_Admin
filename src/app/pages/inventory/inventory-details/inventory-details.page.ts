import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { InventoryService } from "@app_services/inventory/inventory.service";

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.page.html'
})
export class InventoryDetailsPage implements OnInit {

  constructor(
    private pageTitle: Title,
    public dialog: MatDialog,
    private inventoryService: InventoryService
  ) {
    this.pageTitle.setTitle('جزییات انبار محصول');
  }

  ngOnInit(): void {
  }

}
