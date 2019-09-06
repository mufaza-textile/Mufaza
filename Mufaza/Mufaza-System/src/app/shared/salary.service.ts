import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash'; 

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private firebase: AngularFireDatabase) {}
    
    salaryList : AngularFireList<any>;

    form : FormGroup = new FormGroup({
  
      $key : new FormControl(null,Validators.required),
      empID: new FormControl(''),
      empName : new FormControl(''),
      designation : new FormControl(''),
      basic : new FormControl(''),
      allow : new FormControl(''),
      tax : new FormControl(''),
      date :new FormControl(''),
      bankAcc :new FormControl(''),
      pfAcc:new FormControl('')

  
   });
 
   initializeFormGroup(){

    this.form.setValue({
      $key : null,
      empID: (''),
      empName :(''),
      designation :(''),
      basic : (''),
      allow : (''),
      tax : (''),
      date :(''),
      bankAcc :(''),
      pfAcc:('')
    
      
    });
}
getSalary(){
  this.salaryList = this.firebase.list('salary');
  return this.salaryList.snapshotChanges();
}
insertSalary(sal){
  this.salaryList.push({

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
  
      })
  }
  
  deleteSalary($key: string){
    this.salaryList.remove($key);
  }
  
  populateForm(sal){
    this.form.patchValue(sal);
  }




}