import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private firebase :AngularFireDatabase) { }

  registerList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    empId : new FormControl('',[Validators.required,Validators.maxLength(5),this.alphaNumeric('abc')]),
    position : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
    //confirmpswd : new FormControl('',[Validators.required,Validators.minLength(8)])
  


  });

  alphaNumeric(allowedPhrase: string): ValidatorFn {
    return (c: FormControl): { [key: string]: boolean } | null => {
      if (c.value) {
        allowedPhrase = allowedPhrase ? allowedPhrase : '';
        let regEx = new RegExp(/^[a-zA-Z0-9]*$/);
        if (!regEx.test(c.value.replace(allowedPhrase.toUpperCase(), '').replace(allowedPhrase.toLowerCase(), ''))) {
          return { 'alphanumeric': true };
        }
      }
      return null;
    };
  };


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
