import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { OrderService } from 'src/app/shared/order.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-trending-report',
  templateUrl: './trending-report.component.html',
  styleUrls: ['./trending-report.component.css']
})
export class TrendingReportComponent implements OnInit {
  orders$;
  constructor(private service: OrderService,private dialog: MatDialog){
    this.orders$ = service.getOrders();
  }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`#`, `productName`,`datePlaced`];

   
  
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getOrders().subscribe(
    list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }
  );
  }
  objectKeys(obj) {
    return Object.keys(obj);
}
  print(){
    var data = document.getElementById("report");  
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
      pdf.save('trending.pdf'); // Generated PDF   
    });  
  }

}
