import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms"

@Injectable()
export class TailoringService {

  constructor() { }

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
}
