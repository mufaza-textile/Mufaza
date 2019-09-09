import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // departmentList:AngularFireList<any>;
  // array=[];
  
  constructor(private firebase :AngularFireDatabase, private datePipe: DatePipe) {
    // this.departmentList = this.firebase.list('products');
    // this.departmentList.snapshotChanges().subscribe(
    //   list => {
    //     this.array = list.map(item =>{
    //       return {
    //         $key: item.key,
    //         ...item.payload.val()
    //       };
    //     });
    //   });
   }

  productList : AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('0'),
    sizes: new FormControl([]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    imageUrl: new FormControl(''),
    date: new FormControl('')
  });

initializeFormGroup() {
    this.form.setValue({
      $key: null,
      title: '',
      price: '',
      category: '0',
      sizes: [],
      quantity: '',
      imageUrl: '',
      date: ''
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
      sizes: product.sizes,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      date: product.date == "" ? "" : this.datePipe.transform(product.date, 'yyyy-MM-dd'),
      lastDate : ''
    });
  }

  updateProduct(product){
    this.productList.update(product.$key,
      {
        title: product.title,
      price: product.price,
      category: product.category,
      sizes: product.sizes,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      date: product.date == "" ? "" : this.datePipe.transform(product.date, 'yyyy-MM-dd'),
      
      } );
  }

  deleteProduct($key:string){
    this.productList.remove($key);
  }

  populateForm(product) {
    this.form.patchValue(product);
  }
}
