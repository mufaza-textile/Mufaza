import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { StockService } from '../../shared/stock.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  constructor(private service: StockService,
    public dialogRef: MatDialogRef <ProductStockComponent> ) { }

  ngOnInit() {
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
