import { Component, OnInit,ViewChild } from '@angular/core';
import { SuppliersService } from '../../shared/suppliers.service';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  constructor(private service : SuppliersService,
    private dialog: MatDialog,
    private router : Router) { }

  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`supName`,`compName`,`oDate`,`quantity`,`payment`,`actions`];


  key : string;

  expandedElement : MatTableDataSource<any>;
  
    
      @ViewChild(MatSort,{static: true}) sort: MatSort;
      @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.service.getSuppliers().subscribe(
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

  navigate($key){
    this.router.navigateByUrl('supplies');
  }
getkey(){
  return this.key;
}


}
