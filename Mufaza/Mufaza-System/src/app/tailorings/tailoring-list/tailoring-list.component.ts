import { Component, OnInit,ViewChild } from '@angular/core';
import { TailoringService } from 'src/app/shared/tailoring.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-tailoring-list',
  templateUrl: './tailoring-list.component.html',
  styleUrls: ['./tailoring-list.component.css']
})
export class TailoringListComponent implements OnInit {

  constructor(private service: TailoringService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: String[] = ['orderID','customerID','username','chest','shoulder','arms','frontNeck','backNeck','length','actions']

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getTailorings().subscribe(
      list => {
        let array =list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
          
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
