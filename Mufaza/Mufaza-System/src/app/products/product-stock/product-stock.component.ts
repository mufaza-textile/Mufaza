import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { StockService } from '../../shared/stock.service';
import { NotifcationService } from "../../shared/notifcation.service";

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  constructor(private service: StockService,
    private notificationService : NotifcationService,
    public dialogRef: MatDialogRef <ProductStockComponent> ) { }

  ngOnInit() {
    this.service.getStockDetail();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value)
      this.service.insertStock(this.service.form.value)
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Succesfully' );
      this.onClose();
    }

  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
