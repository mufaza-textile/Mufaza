import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

constructor(private firebase :AngularFireDatabase) { }

promotionList : AngularFireList<any>;

form : FormGroup = new FormGroup({

  $key : new FormControl(null),
  promoName : new FormControl('',Validators.required),
  percentage : new FormControl(''),
  
});


initializeFormGroup(){

  this.form.setValue({

    $key:null,
    promoName:'',
    percentage:'',
  })
}

  getPromotions(){
    this.promotionList =this.firebase.list('promotions');
    return this.promotionList.snapshotChanges(); 
  }


  insertPromotion(promotion){
    this.promotionList.push({
      promoName: promotion.promoName,
      percentage : promotion.percentage,
    });
  }


  updatePromotion(promotion){
    this.promotionList.update(promotion.$key,
      {
        promoName: promotion.promoName,
        percentage: promotion.percentage,
      } );
  }


deletePromotion($key:string){
  this.promotionList.remove($key);

}

populateForm(promotion) {
  this.form.patchValue(promotion);
}

}
