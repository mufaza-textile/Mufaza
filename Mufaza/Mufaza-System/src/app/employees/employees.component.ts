import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'; 


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  


  @ViewChild('content',{static:true}) content: ElementRef;

  public downloadPDF() {
    
  
  
    let doc = new jsPDF();
  
    let specialElementHandlers = {
      '#editor':function(elemenet, renderer){
        return  true;
      }
    };
    
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15, {
      'width':190,
      'elementHandlers':specialElementHandlers
    });
  doc.save('employee.pdf');
  }


  constructor() { }

  ngOnInit() {
   

  }

}
