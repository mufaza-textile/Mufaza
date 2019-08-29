import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private firebase :AngularFireDatabase) { }

  registerList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    userName : new FormControl('',Validators.required),
    empId : new FormControl('',[Validators.required,Validators.minLength(5)]),
    position : new FormControl('0'),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
    //confirmpswd : new FormControl('',[Validators.required,Validators.minLength(8)])
  


  });

  initializeFormGroup(){

    this.form.setValue({

      $key:null,
      userName:'',
      empId:'',
      position:0,
      password:''
     // confirmpswd:''
      
    });
}

getInternalUsers(){
  this.registerList = this.firebase.list('users');
  return this.registerList.snapshotChanges();
}
insertInternalUser(user){
  this.registerList.push({
      userName:user.userName,
      employeeId:user.empId,
      position:user.position,
      password:user.password
  });
}

updateInternalUser(user){
  this.registerList.update(user.$key,
    {
      userName:user.userName,
      employeeId:user.empId,
      position:user.position,
      password:user.password
    })
}

deleteInternalUser($key: string){
  this.registerList.remove($key);
}
}
