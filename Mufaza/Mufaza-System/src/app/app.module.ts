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
import { AddProductFormComponent } from './products/add-product-form/add-product-form.component';
import { ProductService } from './shared/product.service';
import { InternalUserComponent } from './internal-user/internal-user.component';
import { RegisterComponent } from './internal-user/register/register.component';
import { RegisterService } from './shared/register.service';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryRiderListComponent } from './delivery/delivery-rider-list/delivery-rider-list.component';
import { DeliveryAllocateRiderComponent } from './delivery/delivery-allocate-rider/delivery-allocate-rider.component';
import { DeliveryReportComponent } from './delivery/delivery-report/delivery-report.component';
import { DeliveryAddRiderComponent } from './delivery/delivery-add-rider/delivery-add-rider.component';

@NgModule({
  declarations: [
    AppComponent,
    SuppliersComponent,
    SupplierComponent,
    AddProductFormComponent,
    InternalUserComponent,
    RegisterComponent,
    SupplierListComponent,
    DeliveryComponent,
    DeliveryRiderListComponent,
    DeliveryAllocateRiderComponent,
    DeliveryReportComponent,
    DeliveryAddRiderComponent
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
  providers: [SuppliersService,OrderTypesService, ProductService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
