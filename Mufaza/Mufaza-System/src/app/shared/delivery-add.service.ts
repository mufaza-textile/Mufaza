import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddService {

  constructor(private firebase :AngularFireDatabase) { }

  deliveryList : AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    riderId: new FormControl('', Validators.required),
    orderId: new FormControl('',Validators.required),
    cusName : new FormControl('',Validators.required),
    deliveryAddress : new FormControl(''),
    deliveryDate: new FormControl('', Validators.required)
  });

initializeFormGroup() {
    this.form.setValue({
      $key: null,
      riderId: '',
      orderId: '',
      cusName: '',
      deliveryAddress: '',
      deliveryDate: ''
    });
  }

  getDelivery(){
    this.deliveryList =this.firebase.list('delivery');
    return this.deliveryList.snapshotChanges(); 
  }

  insertDelivery(delivery){
    this.deliveryList.push({
        riderId: delivery.riderId,
        orderId: delivery.orderId,
        cusName: delivery.cusName,
        deliveryAddress: delivery.deliveryAddress,
        deliveryDate: delivery.deliveryDate,
    });
  }

  updateDelivery(delivery){
    this.deliveryList.update(delivery.$key,
      {
        riderId: delivery.riderId,
        orderId: delivery.orderId,
        cusName: delivery.cusName,
        deliveryAddress: delivery.deliveryAddress,
        deliveryDate: delivery.deliveryDate
      } );
  }

  populateForm(delivery) {
    this.form.patchValue(delivery);
  }

  deleteDelivery($key:string){
    this.deliveryList.remove($key);
  }

}
