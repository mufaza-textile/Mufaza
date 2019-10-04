import { Component, OnInit,ViewChild } from '@angular/core';
import { SupplierComponent } from "./../supplier/supplier.component";
import { SuppliersService } from '../../shared/suppliers.service';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element, $ } from 'protractor';
import { Router } from '@angular/router';
import { SuppliesService } from "../../shared/supplies.service";
import { Chart } from "chart.js";
import { loadavg } from 'os';
import { AngularFireDatabase,AngularFireList  } from "angularfire2/database";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { ReportComponent } from "../report/report.component";


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
  ]),
],
})
export class SupplierListComponent implements OnInit {

  constructor(private service : SuppliersService,
    private dialog: MatDialog,
    private router : Router,
    private serv : SuppliesService,
    private db :AngularFireDatabase) { }

    listData: MatTableDataSource<any>;
  
    x:MatTableDataSource<any>;
    supplyList : AngularFireList<any>;
    displayedColumns: string[] =[`supName`,`compName`,`email`,`mobile`,`address`,`actions`];
    supplierList :  string[] = [];
    supplysumList : number[] = [] ;
    arr : any[] = [];
    sumsup : number = 0;
    companyNameList: any[] = [];
    key : string;

    BarChart=[];
    expandedElement : MatTableDataSource<any>;
  
    
    @ViewChild(MatSort,{static: true}) sort: MatSort;
    @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
    searchKey: string;

    ngOnInit() {
    this.service.getSuppliers().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val(),          
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.expandedElement = null;
      array.forEach(element => {
        this.supplierList.push(element.$key);
        this.companyNameList.push(element.compName);
        this.supplysumList.push(element.count);
      });

      this.chart();

    }
    );

// console.log(this.companyNameList);
// console.log(this.supplysumList);







  }

   storearr(x:any) : any{
    return x;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SupplierComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SupplierComponent,dialogConfig);
  }

  onDelete($key){
    this.service.deleteSupplier($key);
  }

  navigate($key){
    this.serv.getSupplys($key);
    this.serv.navigate();
    // this.router.navigateByUrl('supplies');
  }
getkey() : string {
  return this.key;
}



print(){
  var data = document.getElementById("barChart");  
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('suppliers.pdf'); // Generated PDF   
  });  
}

printtab(){
  var data = document.getElementById("tablecontent");  

  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('suppliers.pdf'); // Generated PDF   
  });
}

report(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "30%";
  this.dialog.open(ReportComponent,dialogConfig);
}

chart(){
  this.BarChart = new Chart('barChart', {
       
    type: 'bar',
  data: {
   labels:this.companyNameList,
   datasets: [{
       label: '# of Supplies',
       data  :  this.supplysumList,
       backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(54, 162, 235, 0.2)',
           'rgba(255, 206, 86, 0.2)',
           'rgba(75, 192, 192, 0.2)',
           'rgba(153, 102, 255, 0.2)',
           'rgba(255, 159, 64, 0.2)'
       ],
       borderColor: [
           'rgba(255,99,132,1)',
           'rgba(54, 162, 235, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(255, 159, 64, 1)'
       ],
       borderWidth: 1
   }]
  }, 
  options: {
   title:{
       text:"Bar Chart",
       display:true
   },
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           }
       }]
   }
  }
  });
}

}
