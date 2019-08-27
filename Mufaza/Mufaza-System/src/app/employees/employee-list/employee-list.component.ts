import { Component, OnInit, ViewChild} from '@angular/core';
import { employeesService } from 'src/app/shared/employees.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotifcationService } from 'src/app/shared/notifcation.service';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material'; 
import { MatDialog,MatDialogConfig} from "@angular/material";
import { EmployeeComponent } from '../employee/employee.component';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: employeesService,
    private departmentService: DepartmentService,
    private notificationService:NotifcationService,
    private dialog: MatDialog) { } 

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['empName', 'email', 'mobile','address', 'department','actions'];
 
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
    }




}       
    
 