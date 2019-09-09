import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PromotionService} from 'shared/services/promotion.service';
import {Promotions} from 'shared/models/Promotions';
import { FirebaseListObservable } from 'angularfire2/database';
import { NewPriceService } from 'shared/services/new-price.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit{

  promocodes$;

  @Input('cart') cart: ShoppingCart;
  promocode: string;
  promo: boolean = false;
  error:boolean= false;
  newPrice: number;


  public promotions: FirebaseListObservable<Promotions[]>;


  constructor(public promotionService: PromotionService, private sharedService: NewPriceService){
    this.promocodes$ = promotionService.getPromocodes;
}

ngOnInit(){
this.promotionService.getPromocodes
}

  promotion(promocode2: string){
    this.promocode = promocode2;
    
    if(this.promocode === "10off") {
      this.promo = true;
      this.error = false;
      this.newPrice = (this.cart.totalPrice - (this.cart.totalPrice * 0.1));
      this.sharedService.addnewprice(this.newPrice);
    }
    else if(this.promocode === "20off") {
      this.promo = true;
      this.error = false;
      this.newPrice = (this.cart.totalPrice - (this.cart.totalPrice * 0.2));
      this.sharedService.addnewprice(this.newPrice);
    }
    else if(this.promocode === "30off") {
      this.promo = true;
      this.error = false;
      this.newPrice = (this.cart.totalPrice - (this.cart.totalPrice * 0.3));
      this.sharedService.addnewprice(this.newPrice);
    }
    else {
      this.error= true;
      this.promo = false;
      this.newPrice = this.cart.totalPrice;
      this.sharedService.newPrice = this.newPrice;

  }
  }
}

