import { Component, OnInit,ViewChild } from '@angular/core';
import { SuppliersService } from '../../shared/suppliers.service';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  constructor(private service : SuppliersService) { }

  listData: MatTableDataSource<any>;
  
  displayedColumns: string[] =[`supName`,`compName`,`email`,`mobile`,`address`,`payment`,`actions`];
  
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

}
