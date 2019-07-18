import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl(''),
    imgUrl: new FormControl('')
  });

initializeFormGroup() {
    this.form.setValue({
      $key: null,
      title: '',
      price: '',
      category: '',
      imgUrl: ''
    });
  }
}
