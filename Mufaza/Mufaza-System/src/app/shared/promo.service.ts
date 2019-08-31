import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
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
     promocode : new FormControl('',[Validators.required,Validators.maxLength(5)]),
     discount : new FormControl('',[Validators.required])
  
   });
 
   initializeFormGroup(){

    this.form.setValue({

      $key:null,
      promocode:'',
      discount:''
      
    });
}
getPromocodes(){
  this.registerList = this.firebase.list('promotions');
  return this.registerList.snapshotChanges();
}
insertPromocode(promocode){
  this.registerList.push({
      promocode:promocode.promocode,
      discount:promocode.discount
  });
}
  updatePromocode(promocode){
    this.registerList.update(promocode.$key,
      {
        promocode:promocode.promocode,
        discount:promocode.discount
      })
  }
  
  deletePromocode($key: string){
    this.registerList.remove($key);
  }
  
  populateForm(promocode){
    this.form.patchValue(promocode);
  }




}
