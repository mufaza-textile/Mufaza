import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  constructor(private firebase :AngularFireDatabase) { }

  employeeList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    empName : new FormControl('',Validators.required),
    designation : new FormControl(''),
    email : new FormControl('',Validators.email),
    address : new FormControl(''),
    mobile : new FormControl('',[Validators.required,Validators.minLength(10)]),
    department: new FormControl(0),
    joined : new FormControl(''),
    salary : new FormControl(''),
    isPermanent: new FormControl(false)
  


  });

  initializeFormGroup(){

    this.form.setValue({

      $key:null,
      empName:'',
      designation:'',
      email:'',
      address:'',
      mobile:'',
      department:0,
      joined:'',
      salary:'',
      isPermanent: false

    });
  }

    getEmployees(){
      this.employeeList =this.firebase.list('employees');
      return this.employeeList.snapshotChanges(); 
    }
//snapshotchnges it will return the observerble from the angularfire

//employee object contains details automatically creted the primary key
    insertEmployee(employee){
      this.employeeList.push({
      empName: employee.empName,
      designation:employee.designation,
      email:employee.email,
      address:employee.address,
      mobile:employee.mobile,
      department:employee.department,
      joined:employee.joined,
      salary:employee.salary,
      isPermanent:false
      });
    }

//update an existing record and  parameter primarykey or dollar key and second para pass object  contains the updated details
    updateEmployee(employee){
      this.employeeList.update(employee.$key,
        {
          empName: employee.empName,
          
          designation:employee.designation,
          email:employee.email,
          address:employee.address,
          mobile:employee.mobile,
          department:employee.department,
          joined:employee.joined,
          salary:employee.salary,
          isPermanent: employee.isPermanent

        } );
    }





  //by passing primary key

  deleteEmployee($key:string){
    this.employeeList.remove($key);
  }


  populateForm(employee){
  this.form.setValue(employee); //department which is to be ommited
}


}

