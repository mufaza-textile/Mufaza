import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash'; 
import { EmployeesService } from 'src/app/shared/employees.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
 /* empID:String='';
  empName:String='';
  designation:String='';
 basic:number;
 allow:number;
 tax:number;
 date:number;
 bankAcc:number;   */

  constructor(private firebase: AngularFireDatabase) {}
    salaryList : AngularFireList<any>;
   


    form : FormGroup = new FormGroup({
  
       $key: new FormControl(null,Validators.required),
      empName:new FormControl(''),
      designation : new FormControl(''),
      basic : new FormControl('',[Validators.required, Validators.min(0)]),
      allow : new FormControl('',[Validators.min(0)]),
      tax : new FormControl('',[Validators.required, Validators.min(0)]),
      date :new FormControl(''),
      bankAcc :new FormControl(''),
      pfAcc:new FormControl('')

  
   });
 
   initializeFormGroup(){

    this.form.setValue({
      $key : null,
      empID: '',
      empName :'',
      designation :'',
      basic : '',
      allow : '',
      tax : '',
      date :'',
      bankAcc:'',
      pfAcc:'',
    
      
    })
}


getSalary(){
  this.salaryList = this.firebase.list('salary');
  return this.salaryList.snapshotChanges();
}
insertSalary(sal){

  this.salaryList.push({
    empID:sal.empID,
    empName :sal.empName,
    designation :sal.designation,
    basic :sal.basic,
    allow:sal.allow,
   tax:sal.tax,
   date:sal.date,
   bankAcc:sal.bankAcc,
   pfAcc:sal.pfAcc



  });
}

  updateSalary(sal){
    this.salaryList.update(sal.$key,
      {
        empID:sal.empID,
        empName: sal.empName,
        designation:sal.designation,
       basic:sal.basic,
        allow:sal.allow,
        tax:sal.tax,
       date:sal.date,
        bankAcc:sal.bankAcc,
        pfAcc:sal.pfAcc
  
      });
  }
  deleteSalary($key: string){
    this.salaryList.remove($key);
  }
  
  populateForm(sal){
    this.form.patchValue(sal);
  }


}