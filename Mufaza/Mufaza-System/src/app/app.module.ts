import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierComponent } from './suppliers/supplier/supplier.component';
import { SuppliersService } from './shared/suppliers.service';


@NgModule({
  declarations: [
    AppComponent,
    SuppliersComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [SuppliersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
