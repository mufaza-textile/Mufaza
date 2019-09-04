import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  departmentList:AngularFireList<any>;
  array=[];

  constructor(private firebase :AngularFireDatabase) {
    this.departmentList = this.firebase.list('sizes');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }
}
