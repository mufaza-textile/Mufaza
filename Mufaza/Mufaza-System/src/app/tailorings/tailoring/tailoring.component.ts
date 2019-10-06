import { Component, OnInit } from '@angular/core';
import { TailoringService } from '../../shared/tailoring.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material';
import { from } from 'rxjs';

@Component({
  selector: 'app-tailoring',
  templateUrl: './tailoring.component.html',
  styleUrls: ['./tailoring.component.css']
})
export class TailoringComponent implements OnInit {

  constructor(private service: TailoringService,
    private notificationService : NotificationService,
    public dialogRef: MatDialogRef<TailoringComponent>) {
      
    }

  chests =[
    { id: 10, value: "10"},
    { id: 12, value: "12"},
    { id: 14, value: "14"}
  ];

  shoulders =[
    { id: 12, value: "12"},
    { id: 14, value: "14"},
    { id: 16, value: "16"}
  ];

  armss =[
    { id: 10, value: "10"},
    { id: 12, value: "12"},
    { id: 14, value: "14"}
  ];

  frontNecks =[
    { id: 8, value: "8"},
    { id: 10, value: "10"},
    { id: 12, value: "12"}
  ];

  backNecks =[
    { id: 8, value: "8"},
    { id: 10, value: "10"},
    { id: 12, value: "12"}
  ];

  lengths =[
    { id: 14, value: "14"},
    { id: 16, value: "16"},
    { id: 18, value: "18"}
  ];

  ngOnInit() {
    this.service.getTailorings();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    console.log("hhjhjhfh");
    
    if (this.service.form.valid){
      if (!this.service.form.get('$key').value)
      this.service.insertTailoring(this.service.form.value);
      else
      this.service.updateTailoring(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfully!');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }


}
