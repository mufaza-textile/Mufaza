import { PromotionsService } from './../../shared/promotions.service';
import { PromotionComponent } from './../promotion/promotion.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';
@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
  ]),
],
})
export class PromotionListComponent implements OnInit {

  constructor(private service : PromotionsService,
    private dialog: MatDialog,) { }
    listData: MatTableDataSource<any>;

    displayColumns: string[] = [`promoName`,`percentage`];

    expandedElement : MatTableDataSource<any>;
  

    @ViewChild(MatSort,{static: true}) sort: MatSort;
    @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
    searchKey: string;
  ngOnInit() {
    this.service.getPromotions().subscribe(
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
        this.expandedElement = null;
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
    this.dialog.open(PromotionComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PromotionComponent,dialogConfig);
  }

  onDelete($key){
    this.service.deletePromotion($key);
  }


}
