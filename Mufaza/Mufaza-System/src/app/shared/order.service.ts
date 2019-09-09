import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  array=[];
  constructor(private firebase: AngularFireDatabase) {
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
     CustomerName : new FormControl('',[Validators.required]),
     DatePlaced : new FormControl('',[Validators.required,Validators.maxLength(30)]),
     TotalPrice : new FormControl('',[Validators.required]),
     NewPrice : new FormControl('',[Validators.required])
    
     
   });
 
   initializeFormGroup(){

    this.form.setValue({

      $key:null,
      CustomerName:'',
      DatePlaced:'',
      TotalPrice:'',
      NewPrice:''
    
      
    });
}
getOrders(){
  this.registerList = this.firebase.list('orders');
  return this.registerList.snapshotChanges();
}
  
  delete($key: string){
    this.registerList.remove($key);
  }
  
  populateForm(order){
    this.form.patchValue(order);
  }




}
