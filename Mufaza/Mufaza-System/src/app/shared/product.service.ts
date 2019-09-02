import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  departmentList:AngularFireList<any>;
  array=[];
  
  constructor(private firebase :AngularFireDatabase) {
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
      imageUrl: product.imgUrl,
    });
  }

  updateProduct(product){
    this.productList.update(product.$key,
      {
        title: product.title,
      price: product.price,
      category: product.category,
      imageUrl: product.imgUrl,
      } );
  }

  deleteProduct($key:string){
    this.productList.remove($key);
  }

  populateForm(product) {
    this.form.patchValue(product);
  }
}
