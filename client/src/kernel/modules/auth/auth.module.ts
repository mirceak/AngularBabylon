import { NgModule } from '@angular/core';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@NgModule({
  imports: [],
  exports: [],
  providers: [ServiceAuth],
})
export class AuthModule {}
