import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms"
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class TailoringService {

  constructor(private firebase: AngularFireDatabase) { }

  tailoringList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    orderID: new FormControl('',Validators.required),
    customerID: new FormControl('',Validators.required),
    username:  new FormControl('',Validators.required),
    chest: new FormControl('0'),
    shoulder: new FormControl('0'),
    arms: new FormControl('0'),
    frontNeck: new FormControl('0'),
    backNeck: new FormControl('0'),
    length: new FormControl('0'),
    deliveryDate: new FormControl(''),

  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      orderID: '',
      customerID: '',
      username:  '',
      chest: 0,
      shoulder: 0,
      arms: 0,
      frontNeck: 0,
      backNeck: 0,
      length: 0,
      deliveryDate: ''
    });
  }

  getTailorings(){
    this.tailoringList = this.firebase.list('tailorings');
    return this.tailoringList.snapshotChanges();
  }

  insertTailoring(tailoring){
    this.tailoringList.push({
      orderID: tailoring.orderID,
      customerID: tailoring.customerID,
      username: tailoring.username,
      chest: tailoring.chest,
      shoulder: tailoring.chest,
      arms: tailoring.chest,
      frontNeck: tailoring.frontNeck,
      backNeck: tailoring.backNeck,
      length: tailoring.length,
      deliveryDate: tailoring.deliveryDate

    });
  }

  updateTailoring(tailoring){
    this.tailoringList.update(tailoring.$key,
      {
      orderID: tailoring.orderID,
      customerID: tailoring.customerID,
      username: tailoring.username,
      chest: tailoring.chest,
      shoulder: tailoring.chest,
      arms: tailoring.chest,
      frontNeck: tailoring.frontNeck,
      backNeck: tailoring.backNeck,
      length: tailoring.length,
      deliveryDate: tailoring.deliveryDate
    });
  }

  deleteTailoring($key: string){
    this.tailoringList.remove($key);
  }

  populateForm(tailoring){
    this.form.patchValue(tailoring);
  }
}
