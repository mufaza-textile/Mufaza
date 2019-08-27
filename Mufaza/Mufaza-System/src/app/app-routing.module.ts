import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { employeesComponent} from "./employees/employees.component";
import { AddProductFormComponent } from "./products/add-product-form/add-product-form.component";

const routes: Routes = [
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'product', component: AddProductFormComponent},
  {path: 'employees', component: employeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
