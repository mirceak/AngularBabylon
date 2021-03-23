import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseMaterialModule } from '@kernel/material/base.material.module';
import { ParcelModule } from 'single-spa-angular/parcel';

@NgModule({
  declarations: [],
  imports: [BaseMaterialModule, CommonModule, ParcelModule],
  exports: [BaseMaterialModule, CommonModule, ParcelModule],
  providers: [],
})
export class BasePageModule {}
