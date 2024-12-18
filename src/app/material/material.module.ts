import { ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


const matModules = [
  CommonModule,
  MatDialogModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [
    matModules
  ],
  exports: [
    matModules,
  ]
})
export class MaterialModule { }
