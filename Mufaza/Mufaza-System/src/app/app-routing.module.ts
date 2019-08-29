import { TailoringComponent } from './tailorings/tailoring/tailoring.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { AddProductFormComponent } from "./products/add-product-form/add-product-form.component";
import {RegisterComponent} from "./internal-user/register/register.component";
import { DeliveryComponent } from './delivery/delivery.component';
import { EmployeesComponent } from './employees/employees.component';
import { InternalUserComponent} from './internal-user/internal-user.component';
import { TailoringsComponent } from "./tailorings/tailorings.component";

const routes: Routes = [
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'product', component: AddProductFormComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'internal-user', component: InternalUserComponent},
  {path: 'tailoring', component: TailoringsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
