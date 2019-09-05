import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api-service.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  constructor(private _auth: AuthService, private _api: ApiService, private _router: Router) { }

  private flight: any = {};
  private flights: any[];
  private sub: Subscription;

  ngOnInit() {
    this.sub = this.getFlights();
  }

  getFlights() {
    return this._api.get('getFlights.php').subscribe((data: any) => {
      this.flights = data.flights;
    });
  }

  reserveTicket(flight) {
    this.flight = flight;
  }


}

