import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotifcationService } from 'src/app/shared/notifcation.service';

import { SalaryService } from "../../shared/salary.service";
import { SalaryslipComponent } from '../salaryslip/salaryslip.component';
import { MatDialog,MatDialogConfig, MatDialogRef} from "@angular/material";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})


export class SalaryComponent implements OnInit {


constructor(private service: SalaryService,
  private notificationService : NotifcationService,
  private dialog: MatDialog){}
   

ngOnInit() {

  this.service.getSalary();
  //this will called when ALL the modification  and deletion happens
}

currentDate=new Date();


onClear() {
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.notificationService.success(':: Cleared Succesfully' );
}

/*form is valid or not , 
*/


onSubmit() {
  if (this.service.form.valid) {
    if (!this.service.form.get('$key').value)
      this.service.insertSalary(this.service.form.value);
    else
    this.service.updateSalary(this.service.form.value);
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
    this.onClose();
  }
}

onClose() {
  this.service.form.reset();
  this.service.initializeFormGroup();
 
}



totalE(basic,allow){
  basic+allow;
this.totalE

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
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('employee.pdf'); // Generated PDF  
    this.notificationService.success('Report Printed Succesfully!' ); 
  });  
}

}
