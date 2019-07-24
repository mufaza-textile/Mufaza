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
    empId : new FormControl('',[Validators.required,Validators.minLength(10)]),
    position : new FormControl('0'),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmpswd : new FormControl('',[Validators.required,Validators.minLength(8)])
  


  });
}
