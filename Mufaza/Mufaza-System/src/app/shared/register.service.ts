import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  array =[];
  constructor(private firebase :AngularFireDatabase) { 
    list => {
      this.array = list.map(item =>{
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    }
  }

  registerList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    empId : new FormControl('',[Validators.required,Validators.maxLength(5)]),
    position : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
  


  });

  initializeFormGroup(){

    this.form.setValue({

      $key:null,
      empId:'',
      position:'',
      password:''
      
    });
}

getInternalUsers(){
  this.registerList = this.firebase.list('users');
  return this.registerList.snapshotChanges();
}
insertInternalUser(user){
  this.registerList.push({
      userId:user.empId,
      position:user.position,
      password:user.password
  });
}

updateInternalUser(user){
  this.registerList.update(user.$key,
    {
      employeeId:user.empId,
      position:user.position,
      password:user.password
    })
}

deleteInternalUser($key: string){
  this.registerList.remove($key);
}

populateForm(user){
  this.form.patchValue(user);
}
}
