import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import {PromotionService} from 'shared/services/promotion.service';
import {Promotions} from 'shared/models/Promotions';

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

  promotions : Promotions[];
constructor(public promotionService: PromotionService){

}

ngOnInit(){
  this.promotionService.getPromotions().subscribe(promotions =>
  {
    this.promotions = promotions;
  }

)
}


  promotion(promocode: string){
    this.promocode = promocode;
    if(promocode === "10off") {
      this.promo = true;
      this.error = false;
      this.newprice = this.cart.totalPrice - (this.cart.totalPrice * 0.1);
    }
    else {
      this.error= true;
      this.promo = false;
    }

  }
}
