import { SupplierComponent } from './../suppliers/supplier/supplier.component';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList  } from "angularfire2/database";
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { Upload } from './upload';
import 'firebase/storage';


import * as _ from 'lodash';
import { SupplierListComponent } from "./../suppliers/supplier-list/supplier-list.component";
import { SuppliersService } from "./../shared/suppliers.service";
import { DatePipe } from '@angular/common';
import { log } from 'util';
import { PaymentReportComponent } from '../suppliers/report/payment-report/payment-report.component';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private db :AngularFireDatabase, private datePipe: DatePipe,    private router : Router,




) { }


    private payRepComp : PaymentReportComponent
    private basePath:string = '/supplybill';
    uploads: AngularFireList<Upload[]>;

    arrRep: any[];

    
    supplykey : string;

    supplypayment : Number[];
    supplyBrand : string[] ;
    supplyquantity : Number []; 
    supName : AngularFireList<any>;
    key : string;
    sup : SupplierListComponent;
    supplyList : AngularFireList<any>;
    supserv : SuppliersService;
    count :number;
    suppList : AngularFireList<any>;
    imageUrl : string;

    supNamerep:String;





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
  form2 : FormGroup = new FormGroup({

    $key : new FormControl(null), 
    supName : new FormControl('',Validators.required),
    yaxis : new FormControl('',Validators.required),
    table : new FormControl('',Validators.required),
  
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
      this.key = supId.$key;
      this.count = supId.count;
    }
    navigate(){
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
        payment: supplier.payment,
        quantity : supplier.XS + supplier.S + supplier.M + supplier.L + supplier.XL + supplier.XXL

      });
      // console.log();

      this.suppList = this.db.list('suppliers')

      this.suppList.update(this.key,
        {
          count:this.count+1,

         
        } );

        this.router.navigateByUrl('suppliers');


        // console.log(this.suppList);


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
          payment: supplier.payment,
          quantity : supplier.XS + supplier.S + supplier.M + supplier.L + supplier.XL + supplier.XXL
        } );
    }





  

  deleteSupply($key:string){
    this.supplyList.remove($key);
    this.suppList = this.db.list('suppliers')

    this.suppList.update(this.key,
      {
        count:this.count-1,

       
      } );

      this.router.navigateByUrl('suppliers');



  }

  populateForm(supplier) {
    this.form.patchValue(supplier);
  }














  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        // console.log(error)
      },
      () => {
        // upload success
         uploadTask.then(rst => {
          rst.ref.getDownloadURL().then(url => {
            this.db.list('/suppliers/'+ this.key + '/supply/').update(this.supplykey,{
              upload : url,
          
            });  
          })
        })
        upload.name = upload.file.name

        this.db.list('/suppliers/'+ this.key + '/supply/').update(this.supplykey,{
          imgName : upload.name,
      
        });  
      }

    );

}


  // Writes the file details to the realtime db
   saveFileData(name) {
    let storageRef = firebase.storage().ref();

     storageRef.child(`${this.basePath}/${name}`).getDownloadURL().then(function(url) {
      // `url` is the download URL for 'images/stars.jpg'
    
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
    
    
    }).catch(function(error) {
      // Handle any errors
    });

  }

payment(name){
   this.key =   this.form2.get('supName').value
   this.supNamerep =name;
    this.getSupply().subscribe (list => {
      let array= list.map(item =>{
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      
      this.arr(array)
      // this.payRepComp.paychart();

    }
   );

    // console.log(this.supplyBrand);
    // console.log(this.supplypayment);
    // console.log(this.arrRep);

    // console.log(this.form2.get('yaxis').value);

    // console.log(this.supplyList);
    
    // if(this.supplyBrand[0] == null ){
    //   this.payment(this.supNamerep);
    // }
    
}


quantity(name){
  this.key =   this.form2.get('supName').value
  this.supNamerep =name;

    this.getSupply().subscribe (list => {
      let array = list.map(item =>{
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      array.forEach(element => {
        this.supplyquantity.push(element.quantity);
        this.supplyBrand.push(element.BrandName);
      });
    }
   );


  
}

  arr(arr){
    console.log(arr);
    arr.forEach(element => {
      this.supplypayment.push(element.payment);
      this.supplyBrand.push(element.BrandName);
    });
    console.log( this.supplypayment);
    
  }

}