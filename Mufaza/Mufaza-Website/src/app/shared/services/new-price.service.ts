import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs/BehaviorSubject'
@Injectable()
export class NewPriceService {

  public newPrice = 0;
  constructor() {
  }
  addnewprice(newprice){
    this.newPrice = newprice;
  }

  getNewprice(){
    return this.newPrice;
  }
  updatenewPrice(newPrice){
    this.newPrice = newPrice;
  }

}
