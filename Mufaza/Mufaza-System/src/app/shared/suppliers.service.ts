import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  array=[];
  supproList:AngularFireList<any>;

  constructor(private firebase :AngularFireDatabase) {
    this.supproList = this.firebase.list('suppliers');
    this.supproList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }

  supplierList : AngularFireList<any>;

  form : FormGroup = new FormGroup({

    $key : new FormControl(null),
    supName : new FormControl('',Validators.required),
    compName : new FormControl(''),
    email : new FormControl('',Validators.email),
    mobile : new FormControl('',[Validators.required,Validators.pattern('[6-8]\\d{8}')]),
    address : new FormControl(''),
    oType : new FormControl(0),

  


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
    
    })
  }

    getSuppliers(){
      this.supplierList =this.firebase.list('suppliers');
      return this.supplierList.snapshotChanges(); 
    }


    insertSupplier(supplier){
      this.supplierList.push({
        supName: supplier.supName,
        compName: supplier.compName,
        email: supplier.email,
        mobile: supplier.mobile,
        address: supplier.address,
        oType: supplier.oType,
        count: 0
       
      });
    }


    updateSupplier(supplier){
      this.supplierList.update(supplier.$key,
        {
          supName: supplier.supName,
          compName: supplier.compName,
          email: supplier.email,
          mobile: supplier.mobile,
          address: supplier.address,
          oType: supplier.oType,
         
        } );
    }





  

  deleteSupplier($key:string){
    this.supplierList.remove($key);

  }

  populateForm(supplier) {
    this.form.patchValue(supplier);
  }

}

