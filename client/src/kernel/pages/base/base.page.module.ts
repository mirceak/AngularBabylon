import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseMaterialModule } from '@kernel/material/base.material.module';
import { AuthModule } from '@kernel/modules/auth/auth.module';

@NgModule({
  declarations: [],
  imports: [BaseMaterialModule, AuthModule, CommonModule],
  exports: [BaseMaterialModule, AuthModule, CommonModule],
  providers: [],
})
export class BasePageModule {}
