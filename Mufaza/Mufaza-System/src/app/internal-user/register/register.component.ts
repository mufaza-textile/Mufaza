import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../../shared/register.service';
import { MatTableDataSource,MatSort,MatPaginator } from "@angular/material";
import { NotifcationService } from "../../shared/notifcation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:RegisterService, private notificationService : NotifcationService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] =['#',`empID`,`position`,`password`,'actions'];
  
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  positions:string[] = ['Admin','HR', 'Product Manager','Delivery Manager']  
    hide = true;

  ngOnInit() {
    this.service.getInternalUsers().subscribe(
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
       } );
  
  }
  onClear(){
    let $key = this.service.form.get('$key').value;
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.service.form.patchValue({ $key });

  }

  onSubmit(){
     if(this.service.form.valid){
       this.service.insertInternalUser(this.service.form.value);
       this.service.form.reset();
       this.service.initializeFormGroup(); 
       this.notificationService.success(':: Submitted Succesfully' );

     }
  }
}
