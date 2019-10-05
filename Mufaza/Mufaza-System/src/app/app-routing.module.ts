
import { TailoringComponent } from './tailorings/tailoring/tailoring.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { ProductsComponent } from "./products/products.component";
import { DeliveryComponent } from './delivery/delivery.component';
import { EmployeesComponent } from './employees/employees.component';
import { TailoringsComponent } from "./tailorings/tailorings.component";
import { SuppliesComponent } from "./suppliers/supplies/supplies.component";
import { PromoComponent } from './promo/promo.component';
import { SalaryemployeeComponent } from './salaryemployee/salaryemployee.component';
import { OrdersComponent } from './orders/orders.component';
import { TrendingComponent } from './trending/trending.component';
import { CustomerComponent } from './customer/customer.component';


const routes: Routes = [
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'salaryemployee', component:SalaryemployeeComponent},
  {path: 'tailoring', component: TailoringsComponent},
  {path: 'supplies', component: SuppliesComponent},
  {path: 'promo', component: PromoComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'trending', component: TrendingComponent},
  {path: 'customers', component: CustomerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
