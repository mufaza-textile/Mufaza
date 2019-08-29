import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import {RegisterComponent} from "./../register/register.component"
import { RegisterService } from 'src/app/shared/register.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service: RegisterService ,private dialog: MatDialog) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =['#',`empID`,`position`,`password`,'actions'];
  
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.service.getInternalUsers().subscribe(
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

  
  oncreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(RegisterComponent,dialogConfig);
  }


  applyfilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onedit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(RegisterComponent,dialogConfig);
  }

  ondelete($key){
    this.service.deleteInternalUser($key);
  }
}
