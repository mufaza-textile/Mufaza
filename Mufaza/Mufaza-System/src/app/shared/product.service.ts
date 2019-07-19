import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase :AngularFireDatabase) { }

  productList : AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('0'),
    imgUrl: new FormControl('')
  });

initializeFormGroup() {
    this.form.setValue({
      $key: null,
      title: '',
      price: '',
      category: '0',
      imgUrl: ''
    });
  }

  getProducts(){
    this.productList =this.firebase.list('products');
    return this.productList.snapshotChanges(); 
  }

  insertProduct(product){
    this.productList.push({
      title: product.title,
      price: product.price,
      category: product.category,
      imgUrl: product.imgUrl,
    });
  }

  updateProduct(product){
    this.productList.update(product.$key,
      {
        title: product.title,
      price: product.price,
      category: product.category,
      imgUrl: product.imgUrl,
      } );
  }

  deleteProduct($key:string){
    this.productList.remove($key);
  }

}
