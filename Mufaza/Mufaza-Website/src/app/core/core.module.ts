import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { ProfileNavbarComponent } from './components/profile-navbar/profile-navbar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    ProfileNavbarComponent,
  ],
  exports: [
    BsNavbarComponent,
    ProfileNavbarComponent
  ]
})
export class CoreModule { }
