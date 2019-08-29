import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList: AngularFireList<any>;//retrieve all and convert array
  array = [];
  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments'); //firebase node departments
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => { 
          return {
            $key: item.key,
            ...item.payload.val() //destructuring syntax from javascript
          };
        });
      });
   }
   getDepartment($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['name'];
    }
  }


}




 
 