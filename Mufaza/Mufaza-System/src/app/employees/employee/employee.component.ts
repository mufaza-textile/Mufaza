import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../../shared/employees.service";
import { NotifcationService } from "../../shared/notifcation.service";
import { DepartmentService } from 'src/app/shared/department.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeesService,
    private notificationService : NotifcationService,
     private departmentService: DepartmentService,
     private dialogRef:MatDialogRef<EmployeeComponent>){}
     

  ngOnInit() {
    this.service.getEmployees();//this will called when ALL the modification  and deletion happens
  }
  


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Cleared Succesfully' );
  }

  /*form is valid or not , 
  */
  onSubmit(){
    if(this.service.form.valid){
      this.service.insertEmployee(this.service.form.value)
      this.service.form.reset();
      this.service.initializeFormGroup();//initial to default value
      this.notificationService.success(':: Submitted Succesfully' );

    }
  }

  onClose(){
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
  }


}
