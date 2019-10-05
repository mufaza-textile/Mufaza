import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PromoService } from 'src/app/shared/promo.service';
import { PromocodeComponent } from '../promocode/promocode.component';
import { NotifcationService } from 'src/app/shared/notifcation.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { DialogService } from 'src/app/shared/dailog.service';


@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css']
})
export class PromoListComponent implements OnInit {
  showSpinner = true;
  constructor(private service: PromoService,private dialog: MatDialog,private notificationService: NotifcationService, private dialogService: DialogService){}
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`Promocode No`, `promocode`,`discount`,`dateAdded`,'actions'];
  
  
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getPromocodes().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.showSpinner = false;
      }
    );
   
  }

  onSearchclear(){
    this.searchKey = "";
    this.applyfilter();
  }
  
   
  

  oncreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PromocodeComponent,dialogConfig);
  }

  applyfilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }

  onedit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus= true;
    dialogConfig.width = "60%";
    this.dialog.open(PromocodeComponent,dialogConfig);

  }

  ondelete($key){
    this.dialogService.openConfirmDialog("Are you sure you want to delete this record?")
    .afterClosed().subscribe(res =>{
      if(res){
    this.service.deletePromocode($key);
    this.notificationService.warn('::Promotion Code Successfully Deleted!');

  }
});
}
  print(){
    var data = document.getElementById("report");  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('promotions.pdf'); // Generated PDF  
      this.notificationService.success('Report Printed Succesfully!' ); 
    });  
  }

}
