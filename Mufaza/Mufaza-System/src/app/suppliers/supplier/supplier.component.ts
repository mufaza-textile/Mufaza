import { Component, OnInit } from '@angular/core';
import { SuppliersService } from "../../shared/suppliers.service";
import { OrderTypesService } from "../../shared/order-types.service";
import { NotifcationService } from "../../shared/notifcation.service";
import { MatDialogRef } from '@angular/material';

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





demo(){

  this.service.form.setValue({

    $key:null,
      supName:'Abilash',
      compName:'AbiTeck',
      email:'abilash2027@gmail.com',
      mobile:'0771120622',
      address:'57,Thelangapatha Rd, Wattala',
      oType:0,
  
  })
}
}