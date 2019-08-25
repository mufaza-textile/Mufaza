import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DeliveryService } from 'src/app/shared/delivery-add.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.css']
})
export class DeliveryReportComponent implements OnInit {

  constructor(private service : DeliveryService) { }
 
  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`riderId`,`orderId`,`cusName`,`deliveryAddress`,`deliveryDate`];
  
      @ViewChild(MatSort,{static: true}) sort: MatSort;
      @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.service.getDelivery().subscribe(
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
      }
    );
  }
}

