import { AuthService } from './services/auth-service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT255-Angular-PZ';
  constructor(private _router: Router, private _authService: AuthService) {
  }

  logout() {
    !!localStorage.getItem('admin') ? localStorage.removeItem('admin') : '';
    localStorage.removeItem('token');
    this._authService.setAuth(false);
    this._authService.setAdmin(false);
    this._router.navigateByUrl('home');
  }
}