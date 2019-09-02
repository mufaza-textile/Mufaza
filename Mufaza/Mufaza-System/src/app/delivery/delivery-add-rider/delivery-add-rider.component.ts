import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../../shared/delivery.service";
import { NotifcationService } from "../../shared/notifcation.service";
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-delivery-add-rider',
  templateUrl: './delivery-add-rider.component.html',
  styleUrls: ['./delivery-add-rider.component.css']
})
export class DeliveryAddRiderComponent implements OnInit {

  constructor(private service: DeliveryService,
    private notificationService : NotifcationService,
    public dialogRef: MatDialogRef <DeliveryAddRiderComponent>) { }

  
    ngOnInit() {
      this.service.getDelivery();
    }
  
  
  
    onClear() {
      this.service.form.reset();
      this.service.initializeFormGroup();
  
    }
  
    onSubmit(){
      if(this.service.form.valid){
        if (!this.service.form.get('$keys').value)
        this.service.insertDelivery(this.service.form.value)
        else
        this.service.updateDelivery(this.service.form.value);
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
  