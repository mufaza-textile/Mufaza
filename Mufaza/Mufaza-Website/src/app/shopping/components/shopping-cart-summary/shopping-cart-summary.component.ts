import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PromotionService} from 'shared/services/promotion.service';
import {Promotions} from 'shared/models/Promotions';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit{
 
  @Input('cart') cart: ShoppingCart;
  promocode: string;
  newprice: any;
  promo: boolean = false;
  error:boolean= false;
  newPrice: number;

  public promotions: FirebaseListObservable<Promotions[]>;


  constructor(public promotionService: PromotionService){

}

ngOnInit(){
  this.promotions = this.promotionService.getPromoList({});
}

  promotion(promocode: string){
    this.promocode = promocode;
    if(promocode === "10off") {
      this.promo = true;
      this.error = false;
      this.newPrice = this.cart.totalPrice - (this.cart.totalPrice * 0.1);
    }
    else {
      this.error= true;
      this.promo = false;
    }

  }


}
