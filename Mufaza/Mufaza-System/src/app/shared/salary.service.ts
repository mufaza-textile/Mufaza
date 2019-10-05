import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash'; 
import { EmployeesService } from 'src/app/shared/employees.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private firebase: AngularFireDatabase) {}
    salaryList : AngularFireList<any>;
   


    form : FormGroup = new FormGroup({
  
       $key: new FormControl(null),
      empName:new FormControl(''),
      designation : new FormControl(''),
      basic : new FormControl('',[Validators.required, Validators.min(0)]),
      allow : new FormControl('',[Validators.min(0)]),
      tax : new FormControl('',[Validators.required, Validators.min(0)]),
      date :new FormControl(''),
      bankAcc :new FormControl(''),
      pfAcc:new FormControl(''),
      isIssued:new FormControl(false)
  
   });
 
   initializeFormGroup(){

    this.form.setValue({
      $key : null,
      empName :'',
      designation :'',
      basic : '',
      allow : '',
      tax : '',
      date :'',
      bankAcc:'',
      pfAcc:'',
      isIssued:false
    
      
    })
}


getSalary(){
  this.salaryList = this.firebase.list('salarys');
  return this.salaryList.snapshotChanges();
}
insertSalary(salary){

  this.salaryList.push({
    empName :salary.empName,
    designation :salary.designation,
    basic :salary.basic,
    allow:salary.allow,
   tax:salary.tax,
   date:salary.date,
   bankAcc:salary.bankAcc,
   pfAcc:salary.pfAcc,
   isIssued:false


  });
}

  updateSalary(salary){
    this.salaryList.update(salary.$key,
      {
        empName:salary.empName,
        designation:salary.designation,
       basic:salary.basic,
        allow:salary.allow,
        tax:salary.tax,
       date:salary.date,
        bankAcc:salary.bankAcc,
        pfAcc:salary.pfAcc,
        isIssued:salary.isIssued,
  
      });
  }
  deleteSalary($key: string){
    this.salaryList.remove($key);
  }
  
  populateForm(salary){
    this.form.patchValue(salary);
  }


}