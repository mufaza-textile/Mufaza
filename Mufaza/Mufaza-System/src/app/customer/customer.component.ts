import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../shared/customer.service'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }
 

  ngOnInit() {
    
  }

  
}
