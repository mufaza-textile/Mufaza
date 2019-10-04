import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierComponent } from './suppliers/supplier/supplier.component';
import { SuppliersService } from './shared/suppliers.service';
import { environment } from "../environments/environment";
import { OrderTypesService } from "./shared/order-types.service";
import { ProductService } from './shared/product.service';
import { InternalUserComponent } from './internal-user/internal-user.component';
import { RegisterComponent } from './internal-user/register/register.component';
import { RegisterService } from './shared/register.service';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeesService } from './shared/employees.service';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryRiderListComponent } from './delivery/delivery-rider-list/delivery-rider-list.component';
import { DeliveryAllocateRiderComponent } from './delivery/delivery-allocate-rider/delivery-allocate-rider.component';
import { DeliveryReportComponent } from './delivery/delivery-report/delivery-report.component';
import { DeliveryAddRiderComponent } from './delivery/delivery-add-rider/delivery-add-rider.component';
import { DatePipe } from '@angular/common';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { DepartmentService } from './shared/department.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import {UserListComponent} from './internal-user/user-list/user-list.component';
import { DeliveryService } from './shared/delivery.service';
import { TailoringsComponent } from './tailorings/tailorings.component';
import { TailoringComponent } from './tailorings/tailoring/tailoring.component';
import { PromoComponent } from './promo/promo.component';
import { PromoListComponent } from './promo/promo-list/promo-list.component';
import { PromocodeComponent } from './promo/promocode/promocode.component';
import { PromoService } from './shared/promo.service';
import { SuppliesComponent } from './suppliers/supplies/supplies.component';
import { SuppliesService } from "./shared/supplies.service";
import { TailoringService } from "./shared/tailoring.service";
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { SalaryemployeeComponent } from './salaryemployee/salaryemployee.component';
import { SalaryComponent } from './salaryemployee/salary/salary.component';
import { SalaryslipComponent } from './salaryemployee/salaryslip/salaryslip.component';
import { SupplyComponent } from './suppliers/supplies/supply/supply.component';
import { MatSliderModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProductStockComponent } from './products/product-stock/product-stock.component';
import { ProductStockListComponent } from './products/product-stock-list/product-stock-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderReportComponent } from './orders/order-report/order-report.component';
import { OrderService } from './shared/order.service';
import { TrendingComponent } from './trending/trending.component';
import { TrendingReportComponent } from './trending/trending-report/trending-report.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerService } from './shared/customer.service'


@NgModule({
   declarations: [
      AppComponent,
      SuppliersComponent,
      SupplierComponent,
      ProductsComponent,
      ProductComponent,
      InternalUserComponent,
      RegisterComponent,
      SupplierListComponent,
      EmployeesComponent,
      EmployeeComponent,
      EmployeeListComponent,
      DeliveryComponent,
      DeliveryRiderListComponent,
      DeliveryAllocateRiderComponent,
      DeliveryReportComponent,
      DeliveryAddRiderComponent,
      MatConfirmDialogComponent,
      UserListComponent,
      TailoringsComponent,
      TailoringComponent,
      PromoComponent,
      PromoListComponent,
      PromocodeComponent,
      SuppliesComponent,
      ProductListComponent,
      SalaryemployeeComponent,
      SalaryComponent,
      SalaryslipComponent,
      SupplyComponent,
      ProductStockComponent,
      ProductStockListComponent,
      OrdersComponent,
      OrderReportComponent,
      TrendingComponent,
      TrendingReportComponent,
      NavigationComponent,
      CustomerComponent,
      CustomerListComponent
   ],
   imports: [
      BrowserModule,
      MatSliderModule,
      AppRoutingModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      MatExpansionModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
   ],
   providers: [
      SuppliersService,
      OrderTypesService,
      ProductService,
      EmployeesService,
      RegisterService,
      DatePipe,
      DeliveryService,
      SuppliesService,
      TailoringService,
      PromoService,
      OrderService,
      CustomerService
      
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      SupplierComponent,
      ProductComponent,
      InternalUserComponent,
      EmployeeComponent,
      RegisterComponent,
      DeliveryAddRiderComponent,
      DeliveryAllocateRiderComponent,
      MatConfirmDialogComponent,
      PromoComponent,
      PromocodeComponent,
      SupplyComponent,
      ProductStockComponent,
      ProductStockListComponent,
      NavigationComponent
   ]
})
export class AppModule { }
  