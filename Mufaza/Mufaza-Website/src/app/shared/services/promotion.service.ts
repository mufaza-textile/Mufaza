import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Promotions } from 'shared/models/Promotions';

@Injectable()
export class PromotionService {
  private basePath: string = '/promotions';

  promocodes: FirebaseListObservable<Promotions[]> = null;
  promocode: FirebaseObjectObservable<Promotions> = null;
  handleError: any;

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

  createPromocode(promocode: Promotions): void{
    this.promocodes.push(promocode)
    .catch(error => this.handleError(error))
  }

  //update an existing promocode
  updatePromocode(key: string, value:any): void{
    this.promocodes.update(key,value).catch(error => this.handleError(error))
  }

  //delete a single item
  deletePromocode(key: string): void{
    this.promocodes.remove(key).catch(error => this.handleError(error))
  }

  //delete the entire list of codes
  deleteAll():void{
    this.promocodes.remove().catch(error => this.handleError(error))
  }

  
  
  }
   

