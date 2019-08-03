import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent  {
  @Input('cart') cart: ShoppingCart;
  promocode: string;
  newprice: any;
  promo: boolean = false;
  error:boolean= false;

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
