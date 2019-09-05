import { HttpParams } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api-service.service';
import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {

  constructor(private calendar: NgbCalendar, private _auth: AuthService, private _api: ApiService, private _router: Router) { }


  departureDate: NgbDateStruct;
  arrivalDate: NgbDateStruct;
  date: { year: number, month: number };
  departureTimeDate: string;
  arrivalTimeDate: string;

  departureTime = { hour: 13, minute: 30 };
  arrivalTime = { hour: 13, minute: 30 };

  departureAirportObj: any = {};
  arrivalAirportObj: any = {};
  selectedDepartureAirport: any = {};
  selectedDepartureCountry: any = {};
  selectedArrivalAirport: any = {};
  selectedArrivalCountry: any = {};
  newVal: any;
  sub: Subscription;
  sub1: Subscription;
  private airport: any = {};
  countries: any[];
  private country: any = {};
  airports: any[];



  public addFlightForm = new FormGroup({
    departureCountry: new FormControl(),
    departureAirport: new FormControl(),
    departureDate: new FormControl(),
    departureTime: new FormControl(),
    arrivalCountry: new FormControl(),
    arrivalAirport: new FormControl(),
    arrivalDate: new FormControl(),
    arrivalTime: new FormControl(),
    numTickets: new FormControl()
  });

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
  }

  printCountry() {
    // console.log(this.selectedDepartureCountry);
    // console.log(this.selectedArrivalCountry);
  }
  printAirport() {
    // console.log(this.selectedDepartureAirport);
    // console.log(this.selectedArrivalAirport);
  }
  selectToday() {
    this.departureDate = this.calendar.getToday();
    this.arrivalDate = this.calendar.getToday();
  }
  addFlight() {
    this.departureTimeDate = this.departureDate.year + '-' + this.departureDate.month + '-' + this.departureDate.day + ' ' +
      this.departureTime.hour + ':' + this.departureTime.minute + ':00';
    this.arrivalTimeDate = this.arrivalDate.year + '-' + this.arrivalDate.month + '-' + this.arrivalDate.day + ' ' +
      this.arrivalTime.hour + ':' + this.arrivalTime.minute + ':00';
    this.departureAirportObj = JSON.parse(this.addFlightForm.value.departureAirport);
    this.arrivalAirportObj = JSON.parse(this.addFlightForm.value.arrivalAirport);

    const body = new HttpParams()
      .set('departureAirport', this.departureAirportObj.id)
      .set('departureTimeDate', this.departureTimeDate)
      .set('arrivalAirport', this.arrivalAirportObj.id)
      .set('arrivalTimeDate', this.arrivalTimeDate)
      .set('tickets', this.addFlightForm.value.numTickets);
    this._api.post('addFlight.php', body.toString()).subscribe((data: any) => {
      this.selectToday();
      this.addFlightForm.reset();
    }, (error) => {
      const obj = error.error.error;

      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.innerHTML = obj.split('\\r\\n').join('<br/>').split('\"').join('');
    });
  }
  ngOnInit() {
    this.sub = this.getCountries();
    this.sub1 = this.getAirports();
    this.selectToday();
  }
  getCountries() {
    return this._api.get('getCountries.php').
      subscribe((data: any) => {
        this.countries = data.countries;
      });
  }

  getAirports() {
    return this._api.get('getAirports.php').
      subscribe((data: any) => {
        this.airports = data.airports;
      });
  }
}
