import { SupplierComponent } from './../suppliers/supplier/supplier.component';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';
// import { SupplierListComponent } from "./../suppliers/supplier-list/supplier-list.component";
import { SuppliersService } from "./../shared/suppliers.service";

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private db :AngularFireDatabase,


) { }

    sup : SuppliersService;
  supplyList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    
    quantity : new FormControl(''),
    oDate : new FormControl(''),
    payment : new FormControl('')
  


  });




  initializeFormGroup(){

    this.form.setValue({

      $key:null,
      oType:0,
      quantity:'',
      oDate:'',
      payment:'',
    })
  }

    getSupply(){
      
      let supId = '-LmUCXuRjB9WgipDRdUS';  
      // let supId = this.sup.form.get('$key').value;
      this.supplyList= this.db.list('/suppliers/'+ supId + '/supply/') ;
      return this.supplyList.snapshotChanges(); 

    }


    insertSupply(supplier){

      this.supplyList.push({
        quantity: supplier.quantity,
        oDate: supplier.oDate,
        payment: supplier.payment
      });


    }


    updateSupply(supplier){
      this.supplyList.update(supplier.$key,
        {

          quantity: supplier.quantity,
          oDate: supplier.oDate,
          payment: supplier.payment
        } );
    }





  

  deleteSupply($key:string){
    this.supplyList.remove($key);

  }

  populateForm(supplier) {
    this.form.patchValue(supplier);
  }

}
