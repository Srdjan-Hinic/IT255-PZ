import { MyflightsComponent } from './pages/myflights/myflights.component';
import { AddflightComponent } from './pages/addflight/addflight.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FlightsComponent } from './pages/flights/flights.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "flights", component: FlightsComponent },
  { path: "addflight", component: AddflightComponent, canActivate: [AdminGuardService] },
  { path: "myflights", component: MyflightsComponent, canActivate: [AuthGuardService] },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
