import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-trending-report',
  templateUrl: './trending-report.component.html',
  styleUrls: ['./trending-report.component.css']
})
export class TrendingReportComponent implements OnInit {

  constructor(private service: OrderService,private dialog: MatDialog){}
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`#`, `shipping.name`,`datePlaced`];

   
  
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

}
