import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  ID: string;
  qty: number;

  constructor(private firebase :AngularFireDatabase, private datePipe: DatePipe) { }

  stockList : AngularFireList<any>;
  productList : AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    date: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      quantity: '',
      date: ''
    });
  }


setId(id){
  this.ID = id;
  console.log('aaaaaa' + this.ID);
}

getId(){
  return this.ID;
}

setQty(qty){
  this.qty = qty;
  console.log('aaaaaa' + qty);
}

getQty(){
  return this.qty;
}

  getStockDetail(){
    let id = this.getId();

    this.stockList = this.firebase.list('/products/' + this.ID + '/stock/');
    
    return this.stockList.snapshotChanges(); 
  }

  insertStock(stock){
    let id = this.getId();
    this.productList =this.firebase.list('products');
    this.stockList = this.firebase.list('/products/' + this.ID + '/stock/');
    this.stockList.push({
      quantity: stock.quantity,
      date: stock.date == "" ? "" : this.datePipe.transform(stock.date, 'yyyy-MM-dd'),
    });
    this.productList.update(id,
      {
      quantity: stock.quantity + this.qty,
      lastDate: stock.date == "" ? "" : this.datePipe.transform(stock.date, 'yyyy-MM-dd'),
      });
  }



  // updateProduct(product){
  //   this.productList.update(product.$key,
  //     {
  //     quantity: product.quantity,
  //     last_date: product.date == "" ? "" : this.datePipe.transform(product.date, 'yyyy-MM-dd'),
  //     } );
  // }

}

