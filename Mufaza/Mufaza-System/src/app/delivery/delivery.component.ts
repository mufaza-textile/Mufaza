import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { OrderTypesService } from '../shared/order-types.service';
import { NotifcationService } from '../shared/notifcation.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private service: ProductService, private ordType : OrderTypesService, private notificationService : NotifcationService) { }

  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`#`,`riderName`,`riderAddress`,`riderMobile`,`riderEmail`,`bikenumber`,'actions'];
  
      @ViewChild(MatSort,{static: true}) sort: MatSort;
      @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  ngOnInit() {
  }
}