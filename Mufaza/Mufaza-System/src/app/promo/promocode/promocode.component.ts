import { Component, OnInit } from '@angular/core';
import { PromoService } from 'src/app/shared/promo.service';
import { NotifcationService } from 'src/app/shared/notifcation.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {
  
  minFromDate= new Date();
  maxToDate = new Date();
  constructor(private service: PromoService, private notificationService: NotifcationService, private dialogRef: MatDialogRef<PromocodeComponent>) { }


  ngOnInit() {
    this.service.getPromocodes();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value)
          this.service.insertPromocode(this.service.form.value);
      
     else
      this.service.updatePromocode(this.service.form.value);

      this.service.form.reset();
      this.service.initializeFormGroup(); 
      this.notificationService.success('::Submit Successful!' );
      this.onClose();
    }

 }

 onClose(){
   this.service.form.reset();
   this.service.initializeFormGroup();
   this.dialogRef.close();
 }
}
