import { AuthService } from './../../services/auth-service.service';
import { ApiService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pics: any[];
  private sub: Subscription;

  constructor(private _apiService: ApiService, private _authService: AuthService, private _router: Router) { }


  ngOnInit() {
  }


}
