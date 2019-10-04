import { Component, OnInit } from '@angular/core';
import { SuppliesService } from '../../shared/supplies.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PaymentReportComponent } from "./payment-report/payment-report.component";
import { QuantityReportComponent } from './quantity-report/quantity-report.component';

import { AngularFireDatabase,AngularFireList } from "angularfire2/database";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  departmentList:AngularFireList<any>;
  array=[];
  key : string;
  compName : string;
  constructor(private service: SuppliesService,private firebase :AngularFireDatabase, private dialog: MatDialog,) {
    this.departmentList = this.firebase.list('suppliers');
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

  ngOnInit() {
  }



  showreport(){
 
    for(let i = 0 ; i < this.array.length ; i ++){
      if(this.array[i].$key == this.key){
          this.compName = this.array[i].compName;
      }
    }

    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";


    if (this.service.form2.get('yaxis').value == 2) {
    this.service.payment( this.compName);
    this.dialog.open(PaymentReportComponent,dialogConfig);
    }else{
      this.service.quantity( this.compName);
    this.dialog.open(QuantityReportComponent,dialogConfig);
    }



  }
}
