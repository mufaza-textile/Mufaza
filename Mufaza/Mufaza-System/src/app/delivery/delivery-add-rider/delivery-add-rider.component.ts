import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../../shared/delivery.service";
import { NotifcationService } from "../../shared/notifcation.service";


@Component({
  selector: 'app-delivery-add-rider',
  templateUrl: './delivery-add-rider.component.html',
  styleUrls: ['./delivery-add-rider.component.css']
})
export class DeliveryAddRiderComponent implements OnInit {

  constructor(private service: DeliveryService,
    private notificationService : NotifcationService) { }

  
    ngOnInit() {
      this.service.getDelivery();
    }
  
  
  
    onClear() {
      this.service.form.reset();
      this.service.initializeFormGroup();
  
    }
  
    onSubmit(){
      if(this.service.form.valid){
        this.service.insertDelivery(this.service.form.value)
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Submitted Succesfully' );
  
      }
  
    }
  
  
  }
  