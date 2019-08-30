import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Order } from "../../../shared/models/order";
import { ShoppingCartSummaryComponent } from '../shopping-cart-summary/shopping-cart-summary.component';
import { FormGroup } from '@angular/forms';
import { SummaryResolver } from '@angular/compiler';
import { ShoppingCartSummary } from 'shared/models/shopping-cart-summary';
import { NewPriceService } from 'shared/services/new-price.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  newPrice: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private sharedService: NewPriceService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart,this.sharedService.newprice);
    console.log(this.sharedService.newPrice);

    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
