import { PromotionsService } from './../../shared/promotions.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NotifcationService } from "../../shared/notifcation.service";


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  constructor(private service: PromotionsService,
    private notificationService : NotifcationService,
    public dialogRef: MatDialogRef <PromotionComponent> ) { }

  ngOnInit() {
    this.service.getPromotions();
  }

  

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value)
      this.service.insertPromotion(this.service.form.value)
      else
      this.service.updatePromotion(this.service.form.value);
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
