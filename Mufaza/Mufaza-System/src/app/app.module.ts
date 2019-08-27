import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierComponent } from './suppliers/supplier/supplier.component';
import { SuppliersService } from './shared/suppliers.service';
import { environment } from "../environments/environment";
import { OrderTypesService } from "./shared/order-types.service";
import { AddProductFormComponent } from './products/add-product-form/add-product-form.component';
import { ProductService } from './shared/product.service';
import { EmployeeComponent } from './employees/employee/employee.component';
import { employeesComponent } from './employees/employees.component';
import { employeesService } from './shared/employees.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { DepartmentService } from './shared/department.service';

@NgModule({
  declarations: [
    AppComponent,
    SuppliersComponent,
    SupplierComponent,
    AddProductFormComponent,
    EmployeeComponent,
    employeesComponent,
    EmployeeListComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    
  ],
  providers: [SuppliersService, DepartmentService,OrderTypesService, ProductService,employeesService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[EmployeeComponent],
})
export class AppModule { }
