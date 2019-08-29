import { ShoppingCart } from './shopping-cart';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ViewChild, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';

export class Order implements AfterViewInit{

  @ViewChild(ShoppingCartSummaryComponent)ShoppingCartSummaryComponent;
  datePlaced: number;
  items: any[];
  newPrice: number;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
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
        newPrice: i.newPrice

      }
    })
  }

  ngAfterViewInit(){
    this.newPrice = this.ShoppingCartSummaryComponent.newPrice;
  }
}
