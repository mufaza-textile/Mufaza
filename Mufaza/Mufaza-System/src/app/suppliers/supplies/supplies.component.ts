import { Component, OnInit } from '@angular/core';
import { SuppliesService } from "../../shared/supplies.service";
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] =[`oDate`,`quantity`,`payment`,`actions`];



  constructor(private service: SuppliesService) { }

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
 
      }
     );
  }


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();

  }

  onSubmit(){
    if(this.service.form.valid){
      if (!this.service.form.get('$key').value)
      this.service.insertSupply(this.service.form.value)
      else
      this.service.updateSupply(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }

  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }


}
