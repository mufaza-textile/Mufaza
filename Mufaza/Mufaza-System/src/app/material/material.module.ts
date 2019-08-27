import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as  Material from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatRadioModule,
    Material.MatCheckboxModule,
    Material.MatTableModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,

  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatRadioModule,
    Material.MatCheckboxModule,
     Material.MatTableModule,
     Material.MatIconModule,
     Material.MatPaginatorModule,
     Material.MatSortModule,

  ]
 
})
export class MaterialModule { }
