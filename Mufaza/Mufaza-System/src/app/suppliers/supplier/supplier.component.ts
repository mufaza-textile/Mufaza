import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { SuppliersService } from "../../shared/suppliers.service";
import { OrderTypesService } from "../../shared/order-types.service";
import { NotifcationService } from "../../shared/notifcation.service";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private service: SuppliersService,
    private ordType : OrderTypesService,
    private notificationService : NotifcationService,
    public dialogRef: MatDialogRef <SupplierComponent> ) { }

  ngOnInit() {
    this.service.getSuppliers();
  }



  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value)
      this.service.insertSupplier(this.service.form.value)
      else
      this.service.updateSupplier(this.service.form.value);
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
