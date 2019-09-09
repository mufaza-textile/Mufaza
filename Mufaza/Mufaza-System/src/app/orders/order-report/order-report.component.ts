import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {

  constructor(private service: OrderService,private dialog: MatDialog){}
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`#`, `shipping.name`,`shipping.phone`,`datePlaced`,`totalprice`,`newprice`,`items[0].quantity`,`items[0].title`,'actions'];
  
  
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

  onSearchclear(){
    this.searchKey = "";
    this.applyfilter();
  }

  applyfilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }

  ondelete($key){
    this.service.delete($key);

  }

}
