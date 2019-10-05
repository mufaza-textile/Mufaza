import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {
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
 
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('0'),
    sizes: new FormControl([]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    imageUrl: new FormControl(''),
    date: new FormControl(''),
    sales: new FormControl('')
  });
  initializeFormGroup(){

    this.form.setValue({

      $key: null,
      title: '',
      price: '',
      category: '0',
      sizes: [],
      quantity: '',
      imageUrl: '',
      date: '',
      sales: ''
      
    });
}
getProducts(){
  this.registerList = this.firebase.list('products');
  return this.registerList.snapshotChanges();
}

}
