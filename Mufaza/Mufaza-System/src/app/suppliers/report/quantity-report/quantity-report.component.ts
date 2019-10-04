import { Component, OnInit } from '@angular/core';
import { SuppliesService } from "../../../shared/supplies.service";
import { Chart } from "chart.js";
import { Location } from '@angular/common';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quantity-report',
  templateUrl: './quantity-report.component.html',
  styleUrls: ['./quantity-report.component.css']
})
export class QuantityReportComponent implements OnInit {
  BarChart=[];
  constructor( private serv : SuppliesService,private location: Location) { }
  x = this.serv.supplyBrand;

  ngOnInit() {
    this.BarChart = new Chart('barChart3', {
       
      type: 'bar',
    data: {
     labels:this.x,
     datasets: [{
         label: 'Quantity supplied',
         data  :  this.serv.supplyquantity,
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:this.serv.supNamerep,
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });

    this.serv.supplyquantity = [];
    this.serv.supplyBrand= []
    
  }



  Dwnreport(){
    var data = document.getElementById("barChart3");  
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
      var pdfName = this.serv.supNamerep + '.pdf'
      pdf.save(pdfName); // Generated PDF   
    });  

  }
  }
