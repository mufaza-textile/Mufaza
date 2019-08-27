import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryService } from '../../shared/delivery.service';
import { MatTableDataSource,MatSort,MatPaginator, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-delivery-rider-list',
  templateUrl: './delivery-rider-list.component.html',
  styleUrls: ['./delivery-rider-list.component.css']
})
export class DeliveryRiderListComponent implements OnInit {
  dialog: any;

  constructor(private service : DeliveryService) { }
 
  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`riderName`,`riderAddress`,`riderMobile`,`riderEmail`,`bikenumber`,`actions`];
  
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

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeliveryRiderListComponent,dialogConfig);
  }

onDelete($key){
    this.service.deleteDelivery($key);
  }

}
