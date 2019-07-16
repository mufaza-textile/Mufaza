import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    supName : new FormControl('',Validators.required),
    compName : new FormControl(''),
    email : new FormControl('',Validators.email),
    mobile : new FormControl('',[Validators.required,Validators.minLength(10)]),
    address : new FormControl(''),
    oType : new FormControl(0),
    oDate : new FormControl(''),
    payment : new FormControl('')
  


  });

  initializeFormGroup(){

    this.form.setValue({

      $key:null,
      supName:'',
      compName:'',
      email:'',
      mobile:'',
      address:'',
      oType:0,
      oDate:'',
      payment:'',
    })


  }



}
