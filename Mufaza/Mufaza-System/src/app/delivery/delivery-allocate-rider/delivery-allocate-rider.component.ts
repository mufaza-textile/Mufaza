import { Component, OnInit } from '@angular/core';
import { DeliveryService } from "../../shared/delivery-add.service";
import { NotifcationService } from "../../shared/notifcation.service";

@Component({
  selector: 'app-delivery-allocate-rider',
  templateUrl: './delivery-allocate-rider.component.html',
  styleUrls: ['./delivery-allocate-rider.component.css']
})
export class DeliveryAllocateRiderComponent implements OnInit {

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
