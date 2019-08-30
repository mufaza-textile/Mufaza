import { ShoppingCart } from './shopping-cart';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ViewChild, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ShoppingCartSummary } from './shopping-cart-summary';

export class Order{


  datePlaced: number;
  items: any[];
  newprice: number;


<<<<<<< HEAD
  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart,public NewPrice: number) {
=======
  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart, NewPrice?: number) {
>>>>>>> 04a85923682ce9a89044f467218f7747ee12bcf3
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,

      }
    });
    this.newprice = NewPrice;

  }


}
