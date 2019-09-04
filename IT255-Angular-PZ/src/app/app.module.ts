// modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// services
import { AuthService } from './services/auth-service.service';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ApiService } from './services/api-service.service';

// components

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { AddflightComponent } from './pages/addflight/addflight.component';
import { MyflightsComponent } from './pages/myflights/myflights.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FlightsComponent,
    AddflightComponent,
    MyflightsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, AuthService, AuthGuardService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
