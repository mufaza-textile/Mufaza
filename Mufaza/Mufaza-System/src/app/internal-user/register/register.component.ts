import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../../shared/register.service';
import { NotifcationService } from "../../shared/notifcation.service";
import { MatDialogRef } from '@angular/material';
import { UserListComponent } from '../user-list/user-list.component';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:RegisterService, private notificationService : NotifcationService, private dialogRef:MatDialogRef <RegisterComponent>) { }
  

  positions:string[] = ['Admin','HR', 'Product Manager','Delivery Manager']  
    hide = true;

  ngOnInit() {
    this.service.getInternalUsers();
  }

  
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
     if(this.service.form.valid){
      if (!this.service.form.get('$key').value)
       this.service.insertInternalUser(this.service.form.value);
      else
       this.service.updateInternalUser(this.service.form.value);
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
