import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module.module'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common'; 
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { AuthorizationComponent, DialogDataExampleDialog } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerificationComponent, DialogForVerification } from './verification/verification.component';
import { RestoreOfPasswordComponent } from './restore-of-password/restore-of-password.component';
import { AuthGuard } from './auth.guard';
import { AdminPageComponent } from './home/admin-page/admin-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HomeComponent,
    RegistrationComponent,
    DialogDataExampleDialog,
    VerificationComponent,
    DialogForVerification,
    RestoreOfPasswordComponent,
    AdminPageComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ObserversModule,
    DemoMaterialModule,
    CommonModule,
    MatNativeDateModule,    
    HttpClientModule
  ],
  providers: [ { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
