import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private firebase :AngularFireDatabase) { }

  deliveryList : AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    riderName: new FormControl('', Validators.required),
    riderAddress: new FormControl(''),
    riderMobile : new FormControl('',[Validators.required,Validators.minLength(10)]),
    riderEmail : new FormControl('',Validators.email),
    bikenumber: new FormControl('', Validators.required)
  });

initializeFormGroup() {
    this.form.setValue({
      $key: null,
      riderName: '',
      riderAddress: '',
      riderMobile: '',
      riderEmail: '',
      bikenumber: ''
    });
  }

  getDelivery(){
    this.deliveryList =this.firebase.list('delivery');
    return this.deliveryList.snapshotChanges(); 
  }

  insertDelivery(delivery){
    this.deliveryList.push({
      riderName: delivery.riderName,
      riderAddress: delivery.riderAddress,
      riderMobile: delivery.riderMobile,
      riderEmail: delivery.riderEmail,
      bikenumber: delivery.bikenumber,
    });
  }

  updateDelivery(delivery){
    this.deliveryList.update(delivery.$key,
      {
        riderName: delivery.riderName,
        riderAddress: delivery.riderAddress,
        riderMobile: delivery.riderMobile,
        riderEmail: delivery.riderEmail,
        bikenumber: delivery.bikenumber
      } );
  }

  populateForm(delivery) {
    this.form.patchValue(delivery);
  }

  deleteDelivery($key:string){
    this.deliveryList.remove($key);
  }

}
