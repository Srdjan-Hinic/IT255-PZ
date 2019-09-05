import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './../../services/api-service.service';
import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-airport-management',
  templateUrl: './airport-management.component.html',
  styleUrls: ['./airport-management.component.css']
})
export class AirportManagementComponent implements OnInit {

  constructor(private _auth: AuthService, private _api: ApiService, private _router: Router) { }

  sub: Subscription;
  sub1: Subscription;
  private airport: any = {};
  countries: any[];
  airports: any[];

  public addAirportForm = new FormGroup({
    airportName: new FormControl(),
    city: new FormControl(),
    count: new FormControl()
  });

  public editAirportForm = new FormGroup({
    name: new FormControl()
  });

  ngOnInit() {
    this.sub = this.getCountries();
    this.sub1 = this.getAirports();
  }
  getCountries() {
    return this._api.get('getCountries.php').
      subscribe((data: any) => {
        this.countries = data.countries;
      });
  }

  editAirport(airport) {
    this.airport = airport;
  }

  updateAirport() {
    const body = new HttpParams()
      .set('name', this.editAirportForm.value.name)
      .set('id', this.airport.id);

    this._api.post('editAirport.php', body.toString()).subscribe((data: any) => {
      this.sub.unsubscribe();
      this.sub = this.getCountries();
      this.sub1.unsubscribe();
      this.sub1 = this.getAirports();
      document.getElementById('close-modal').click();
      this.editAirportForm.reset();
      this.airport = {};
    }, (error) => {
      const obj = error.error.error;
    });
  }


  addAirport() {
    const body = new HttpParams()
      .set('name', this.addAirportForm.value.airportName)
      .set('city', this.addAirportForm.value.city)
      .set('country', this.addAirportForm.value.count);
    this._api.post('addAirport.php', body.toString()).subscribe((data: any) => {
      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.style.background = 'rgb(56, 207, 96)';
      element.innerHTML = 'Airport added.';
      this.addAirportForm.reset();
      this.sub.unsubscribe();
      this.sub = this.getCountries();
      this.sub1.unsubscribe();
      this.sub1 = this.getAirports();
    }, (error) => {
      const obj = error.error.error;

      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.innerHTML = obj.split('\\r\\n').join('<br/>').split('\"').join('');
    });
  }

  getAirports() {
    return this._api.get('getAirports.php').
      subscribe((data: any) => {
        this.airports = data.airports;
      });
  }
}
