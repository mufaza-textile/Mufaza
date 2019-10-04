import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PromotionService} from 'shared/services/promotion.service';
import {Promotions} from 'shared/models/Promotions';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
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
  discount : number;
  data : any;


  public promotions: FirebaseListObservable<Promotions[]>;


  constructor(public promotionService: PromotionService, private sharedService: NewPriceService,private db: AngularFireDatabase){
    this.promocodes$ = promotionService.getPromocodes;
}

ngOnInit(){
}

getPromoByCode(code : string){
  return this.db.list('/promotions',{
    query:{
      orderByChild: 'promocode',
      equalTo: code
    }
  });
}

  promotion(promocode2: string){
   this.getPromoByCode(promocode2).subscribe((data:any)=>{
try{
    
    if(data) {
      this.promo = true;
      this.error = false;
      this.newPrice = (this.cart.totalPrice - (this.cart.totalPrice * data[0].discount * 0.01));
      this.sharedService.addnewprice(this.newPrice.toFixed(2));
     

  }}
  catch(err){
    this.error= true;
    this.promo = false;
    this.newPrice = this.cart.totalPrice;
    this.sharedService.newPrice = this.newPrice;
  }
 });
  }
}
