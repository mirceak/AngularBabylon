import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { BaseMaterialModule } from '@kernel/material/base.material.module';

@NgModule({
  declarations: [
    EmptyRouteComponent,
    AppComponent
  ],
  imports: [
    BaseMaterialModule,
    OverlayModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string => localStorage.getItem('token'),
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [MatSnackBar]
})
export class AppModule {}
