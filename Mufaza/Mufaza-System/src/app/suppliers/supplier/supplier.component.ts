import { Component, OnInit } from '@angular/core';

import { SuppliersService } from "../../shared/suppliers.service";
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private service: SuppliersService) { }

  ngOnInit() {
  }

  orderTypes = [
    {id: 1 , value: 'Type 1'},
    {id: 2 , value: 'Type 2'},
    {id: 3 , value: 'Type 3'},


  ]


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
