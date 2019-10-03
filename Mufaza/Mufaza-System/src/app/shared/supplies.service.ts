import { SupplierComponent } from './../suppliers/supplier/supplier.component';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { Router } from '@angular/router';


import * as _ from 'lodash';
import { SupplierListComponent } from "./../suppliers/supplier-list/supplier-list.component";
import { SuppliersService } from "./../shared/suppliers.service";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private db :AngularFireDatabase, private datePipe: DatePipe,    private router : Router,



) { }

key : string;
    sup : SupplierListComponent;
  supplyList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    
    XS : new FormControl(0,Validators.required),
    S : new FormControl(0,Validators.required),
    M : new FormControl(0,Validators.required),
    L : new FormControl(0,Validators.required),
    XL : new FormControl(0,Validators.required),
    XXL : new FormControl(0,Validators.required),
    BrandName : new FormControl('',Validators.required),

    oDate : new FormControl(''),
    payment : new FormControl('')
  


  });




  initializeFormGroup(){

    this.form.setValue({

      $key:null,
      XS :'',
      S : '',
      M :'',
      L : '',
      XL : '',
      XXL : '',
      BrandName : '',
      oDate:'',
      payment:'',
    })
  }

    getSupply() {
      let supId = this.key;
      this.supplyList= this.db.list('/suppliers/'+ supId + '/supply/') ;
      return this.supplyList.snapshotChanges(); 

    }

    getSupplys(supId) {
      this.key = supId;
    this.router.navigateByUrl('supplies');
    }

    insertSupply(supplier){

      this.supplyList.push({
        XS : supplier.XS,
        S : supplier.S,
        M : supplier.M,
        L : supplier.L,
        XL : supplier.XL,
        XXL : supplier.XXL,
        BrandName : supplier.BrandName,
        oDate: supplier.oDate == "" ? "" : this.datePipe.transform(supplier.oDate, 'yyyy-MM-dd'),
        payment: supplier.payment
      });


    }


    updateSupply(supplier){
      this.supplyList.update(supplier.$key,
        {
          XS : supplier.XS,
          S : supplier.S,
          M : supplier.M,
          L : supplier.L,
          XL : supplier.XL,
          XXL : supplier.XXL,
          oDate: supplier.oDate == "" ? "" : this.datePipe.transform(supplier.oDate, 'yyyy-MM-dd'), 
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
