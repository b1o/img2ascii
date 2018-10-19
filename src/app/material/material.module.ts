import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
export const MODULES = [
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
  ],
  declarations: [],
  exports: MODULES
})
export class MaterialModule { }
