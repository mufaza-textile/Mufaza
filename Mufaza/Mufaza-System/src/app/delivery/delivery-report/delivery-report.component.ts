import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { DeliveryAddService } from 'src/app/shared/delivery-add.service';
import { DeliveryAllocateRiderComponent } from '../delivery-allocate-rider/delivery-allocate-rider.component';


@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.css']
})
export class DeliveryReportComponent implements OnInit {

  constructor(private service : DeliveryAddService,
    private dialog: MatDialog,) { }
 
  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`riderId`,`orderId`,`cusName`,`deliveryAddress`,`deliveryDate`,`actions`];
  
      @ViewChild(MatSort,{static: true}) sort: MatSort;
      @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
      searchKey: string;

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

  onSearchClear(){
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
    this.dialog.open(DeliveryAllocateRiderComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeliveryAllocateRiderComponent,dialogConfig);
  }

onDelete($key){
    this.service.deleteDelivery($key);
  }
}

