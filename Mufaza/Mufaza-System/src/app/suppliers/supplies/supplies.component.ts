import { Component, OnInit, ViewChild } from '@angular/core';
import { SuppliesService } from "../../shared/supplies.service";
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort,MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SupplyComponent } from "../supplies/supply/supply.component";
import { Upload } from '../../shared/upload';
import { UploadComponent } from '../supplies/supply/upload/upload.component';
import * as _ from "lodash";
import 'firebase/storage';
import * as jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

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


  currentUpload: Upload;
  selectedFiles: FileList;

  up : UploadComponent;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`oDate`,`BrandName`,`quantity`,`payment`,`actions`];
  expandedElement : MatTableDataSource<any>;
  searchKey: string;

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  constructor(private service: SuppliesService,   private dialog: MatDialog,private upSvc: SuppliesService) { }

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




  detectFiles(event) {
    this.selectedFiles = event.target.files;
}


  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }


  current($key){
    this.service.supplykey = $key;
  }


  view(url){
    this.service.imageUrl = url;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UploadComponent,dialogConfig);
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
      pdf.save('supplies.pdf'); // Generated PDF   
    });  
  }




}
