import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseModuleMaterial } from '@kernel/material/base.module.material';

@NgModule({
  declarations: [],
  imports: [BaseModuleMaterial, CommonModule],
  exports: [BaseModuleMaterial, CommonModule],
})
export class BaseModulePage {}
