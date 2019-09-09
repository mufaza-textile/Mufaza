import { ShoppingCart } from './shopping-cart';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ViewChild, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Product } from './product';

export class Order{


  datePlaced: number;
  items: any[];
  newprice: number;
  totalprice:number;
  itemscount: number;
  quantity: number;


  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart,NewPrice: number) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
  
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
          quantity: i.quantity,
          totalPrice: i.totalPrice,

      }

    });
    this.newprice = NewPrice;
    this.totalprice = shoppingCart.totalPrice;
    this.itemscount = shoppingCart.totalItemsCount;
   

  }


}
