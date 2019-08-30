import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class NewPriceService {

  public newPrice: number;
  
  _newPriceBS = new BehaviorSubject<number>(null);
  
  constructor() { 
    this.newPrice;
    this._newPriceBS.next(this.newPrice);
  }

  updatenewPrice(newPrice){
    this.newPrice = newPrice;
    this._newPriceBS.next(this.newPrice);
  }
  get newprice(): number{
    return this.newPrice;
  }

}
