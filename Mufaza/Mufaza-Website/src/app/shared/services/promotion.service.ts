import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';


@Injectable()
export class PromotionService {
  private basePath: string = '/promotions/';

  promocode: FirebaseObjectObservable<any>;

  promocodes: FirebaseListObservable<any[]>;

  constructor( private db: AngularFireDatabase) {
  
  }

  getPromocodes(){
   this.promocodes = this.db.list(this.basePath);
    return this.promocodes;
  }

  
  
  }
   

