import { Component, OnInit, ViewChild } from '@angular/core';
import { SuppliesService } from "../../shared/supplies.service";
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SupplyComponent } from "../supplies/supply/supply.component";


@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
  ]),
],
})
export class SuppliesComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`oDate`,`BrandName`,`payment`,`actions`];
  expandedElement : MatTableDataSource<any>;
  searchKey: string;

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  constructor(private service: SuppliesService,   private dialog: MatDialog,) { }

  ngOnInit() {
    this.service.getSupply().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.expandedElement = null;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      }
     );
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
    this.dialog.open(SupplyComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SupplyComponent,dialogConfig);
  }

  onDelete($key){
    this.service.deleteSupply($key);
  }






}
