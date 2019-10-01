import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductComponent } from "./../product/product.component";
import { ProductService } from '../../shared/product.service';
import { StockService } from '../../shared/stock.service';
import { NotifcationService } from "../../shared/notifcation.service";
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductStockComponent } from '../product-stock/product-stock.component';
import { ProductStockListComponent } from '../product-stock-list/product-stock-list.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductListComponent implements OnInit {

  constructor(private service : ProductService,
    private stockService : StockService,
    private notificationService : NotifcationService,
    private dialog: MatDialog,) { }

    listData: MatTableDataSource<any>;

    displayedColumns: string[] =[`index`,`title`,`price`,'category','sizes','date','actions'];

    @ViewChild(MatSort,{static: true}) sort: MatSort;
      @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
      searchKey: string;
      ngOnInit() {
        this.service.getProducts().subscribe(
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

      onClear() {
        let $key = this.service.form.get('$key').value;
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.service.form.patchValue({ $key });
      }
    
      onSubmit(){
        if(this.service.form.valid){
          this.service.insertProduct(this.service.form.value)
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.notificationService.success(':: Submitted Succesfully' );
        }
    
      }

      onSearchClear() {
        this.searchKey = "";
        this.applyFilter();
      }
    
      applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
      }
    
      onDelete($key){
        this.service.deleteProduct($key);
      }
    
      onCreate() {
        this.service.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.height = "95%";
        this.dialog.open(ProductComponent,dialogConfig);
      }
    
      onEdit(element){
        this.service.populateForm(element);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(ProductComponent,dialogConfig);
      }

      onAddStock(id, qty){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "40%";
        dialogConfig.height = "50%";
        this.stockService.setId(id);
        this.stockService.setQty(qty);
        this.dialog.open(ProductStockComponent,dialogConfig);
      }

      onStockInfo(id){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.height = "90%";
        this.stockService.setId(id);
        this.dialog.open(ProductStockListComponent,dialogConfig);
      }

      print(){
        
        var data = document.getElementById("report");  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;       
          var imgHeight = canvas.height * imgWidth / canvas.width;   
      
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
          pdf.text ('Products Report', 10, 10);
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          pdf.save('Products-Report.pdf'); // Generated PDF  
          this.notificationService.success('Report Printed Succesfully!' ); 
        });  
      }
}

