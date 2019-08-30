import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class NewPriceService {

<<<<<<< HEAD
  public newPrice: number;
  
  _newPriceBS = new BehaviorSubject<number>(null);
  
  constructor() { 
    this.newPrice;
    this._newPriceBS.next(this.newPrice);
=======
  public newPrice = 0;
  constructor() {
  }
  addnewprice(newprice){
    this.newPrice = newprice;
>>>>>>> 04a85923682ce9a89044f467218f7747ee12bcf3
  }

  getNewprice(){
    return this.newPrice;
  }
  updatenewPrice(newPrice){
    this.newPrice = newPrice;
  }
  get newprice(): number{
    return this.newPrice;
  }

}
