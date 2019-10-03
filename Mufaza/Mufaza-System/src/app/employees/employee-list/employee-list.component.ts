import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { EmployeesService } from 'src/app/shared/employees.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material'; 
import { MatDialog,MatDialogConfig} from "@angular/material";
import { EmployeeComponent } from '../employee/employee.component';
import { NotifcationService} from 'src/app/shared/notifcation.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  dialogService: any;

  constructor(private service: EmployeesService,
    private departmentService: DepartmentService,
    private notificationService : NotifcationService,
    private dialog: MatDialog) { } 

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['$key','empName', 'email', 'mobile','department','actions'];
 
  @ViewChild (MatSort,{static:true}) sort: MatSort;
  @ViewChild (MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;




  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          let department = this.departmentService.getDepartment(item.payload.val()['department']);
          return {
            $key: item.key,
            department,
            ...item.payload.val()
          };
        });
      

        this.listData = new MatTableDataSource(array);
        this.listData.sort= this.sort;
        this.listData.paginator=this.paginator
      });
      
  }
 
    onSearchClear(){
      this.searchKey="";
      this.applyFilter();
    }

    applyFilter(){
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }
    onCreate(){
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
    
      this.dialog.open(EmployeeComponent,dialogConfig);  
    }

    onEdit(row){
      this.service.populateForm(row); 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(EmployeeComponent,dialogConfig);    
    }


    onDelete($key){
          this.service.deleteEmployee($key);
          this.notificationService.success(':: Deleted successfully');
         
    }

    


    
    downloadPDF(){
      var data = document.getElementById("report");  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        pdf.text('Employee LIst of Mufaza Company', 10, 10);
        var position = 0;  

        pdf.addImage(contentDataURL, 'PNG',0, position, imgWidth, imgHeight)  
        pdf.save('employee.pdf'); // Generated PDF  
        this.notificationService.success('Report Printed Succesfully!' ); 
      });  
    }
} 
  
      
