import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class PromotionService {
  promocodes: FirebaseListObservable<any []>;
  promocode: FirebaseObjectObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.promocodes = this.db.list('/promotions/') as FirebaseListObservable<promocode[]>;
  }
   getPromotions(){
    return this.promocodes;
   }
}
