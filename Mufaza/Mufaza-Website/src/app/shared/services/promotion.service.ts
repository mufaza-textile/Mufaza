import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';


@Injectable()
export class PromotionService {

  promocode: FirebaseObjectObservable<any>;

  promocodes: FirebaseListObservable<any[]>;

  constructor( public af: AngularFireDatabase) {
    this.promocodes = this.af.list('/promotions');
  
  }

  getPromocodes(){
    return this.promocodes;
  }

  
  
  }
   

