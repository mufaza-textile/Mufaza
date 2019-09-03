import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductComponent } from "./../product/product.component";
import { ProductService } from '../../shared/product.service';
import { NotifcationService } from "../../shared/notifcation.service";
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private service : ProductService,
    private notificationService : NotifcationService,
    private dialog: MatDialog,) { }

    listData: MatTableDataSource<any>;

    displayedColumns: string[] =[`#`,`title`,`price`,'actions'];

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
        this.dialog.open(ProductComponent,dialogConfig);
      }
    
      onEdit(row){
        this.service.populateForm(row);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        this.dialog.open(ProductComponent,dialogConfig);
      }

}
