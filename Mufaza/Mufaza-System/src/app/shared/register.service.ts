import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { __values } from 'tslib';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  array =[];
  constructor(private firebase :AngularFireDatabase, private router:Router) { 
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
  currentuser :  AngularFireList<any>;
  logged : boolean = false;

  form : FormGroup = new FormGroup({

    $key : new FormControl('',[Validators.required,Validators.minLength(5)]),
    userId : new FormControl('',[Validators.required,this.alphaNumeric('abc')]),
    position : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)])
  


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

      $key:'',
      userId:'',
      position:'',
      password:''
      
    });
}

getInternalUsers(){
  this.registerList = this.firebase.list('users');
  return this.registerList.snapshotChanges();
}

getuser(username,password){
  this.currentuser = this.firebase.list('/users/' + username);
 if( this.firebase.list('/users/' + username,ref => ref.orderByChild('password').equalTo(password))){
   this.logged = true;
   
 }else{
   this.logged = false;
 }
 window.alert(this.logged)
}
insertInternalUser(user){
  this.registerList.push({
      userId:user.userId,
      position:user.position,
      password:user.password
  });
}

updateInternalUser(user){
  this.registerList.update(user.$key,
    {
      userId:user.userId,
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

get isLoggedIn(): boolean {
 return this.logged;
 // return (user !== null && user.emailVerified !== false) ? true : false;
}

get isLogged(): boolean {
  return false;
}

}
