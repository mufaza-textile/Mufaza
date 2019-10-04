import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CustomerService } from 'src/app/shared/customer.service';
import { NotifcationService} from 'src/app/shared/notifcation.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private service: CustomerService, private notificationService: NotifcationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] =['#',`email`,'displayName'];

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;
  
  ngOnInit() {
    this.service.getCustomers().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
    this.listData = new MatTableDataSource(array);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
       } );
  }
  onSearchclear() {
    this.searchKey = "";
    this.applyfilter();
  }
  applyfilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  print(){
        
    var data = document.getElementById("report");  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;       
      var imgHeight = canvas.height * imgWidth / canvas.width;   
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.text ('Customers Report', 10, 10);
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Customer-List.pdf'); // Generated PDF  
      this.notificationService.success('Report Printed Succesfully!' ); 
    });  
  }
}
