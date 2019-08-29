import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Promotions } from 'shared/models/Promotions';

@Injectable()
export class PromotionService {
  private basePath: string = '/promotions';

  promocodes: FirebaseListObservable<Promotions[]> = null;
  promocode: FirebaseObjectObservable<Promotions> = null;

  constructor( private db: AngularFireDatabase) {
  
  }

  getPromoList(query={}): FirebaseListObservable<Promotions[]>{
    this.promocodes = this.db.list(this.basePath,{
      query: query});
      return this.promocodes
    }

  getPromocode(key: string): FirebaseObjectObservable<Promotions>{
    const promoPath = `${this.basePath}/${key}`;
    this.promocode = this.db.object(promoPath)
    return this.promocode
  }
  
  
  
  }
   

