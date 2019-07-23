import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { AddProductFormComponent } from "./products/add-product-form/add-product-form.component";
import {RegisterComponent} from "./internal-user/register/register.component";

const routes: Routes = [
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'product', component: AddProductFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
