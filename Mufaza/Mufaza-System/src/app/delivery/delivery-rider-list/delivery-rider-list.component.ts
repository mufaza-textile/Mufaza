import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryService } from '../../shared/delivery.service';
import { MatTableDataSource,MatSort,MatPaginator, MatDialogConfig, MatDialog } from "@angular/material";
import { DeliveryAddRiderComponent } from './../delivery-add-rider/delivery-add-rider.component'

@Component({
  selector: 'app-delivery-rider-list',
  templateUrl: './delivery-rider-list.component.html',
  styleUrls: ['./delivery-rider-list.component.css']
})
export class DeliveryRiderListComponent implements OnInit {

  constructor(private service : DeliveryService,
    private dialog: MatDialog,) { }
 
  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`riderName`,`riderAddress`,`riderMobile`,`riderEmail`,`bikenumber`,`actions`];
  
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
    dialogConfig.width = "40%";
    this.dialog.open(DeliveryAddRiderComponent,dialogConfig);
  }


  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(DeliveryAddRiderComponent,dialogConfig);
  }

  onDelete($key){
    this.service.deleteDelivery($key);
  }

}
