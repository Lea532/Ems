import { ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';


const matModules = [
  CommonModule,
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
