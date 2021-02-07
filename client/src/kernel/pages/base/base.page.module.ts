import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseMaterialModule } from '@kernel/material/base.material.module';
@NgModule({
  declarations: [],
  imports: [BaseMaterialModule, CommonModule],
  exports: [BaseMaterialModule, CommonModule],
  providers: [],
})
export class BasePageModule {}
