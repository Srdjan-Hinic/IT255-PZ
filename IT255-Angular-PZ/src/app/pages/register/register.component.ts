import { AuthService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    pid: new FormControl(),
    password: new FormControl(),
    country: new FormControl()
  });

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigateByUrl('home');
    }
  }
  public register() {
    const body = new HttpParams()
      .set('password', this.registerForm.value.password)
      .set('firstName', this.registerForm.value.firstName)
      .set('lastName', this.registerForm.value.lastName)
      .set('pid', this.registerForm.value.pid)
      .set('country', this.registerForm.value.country);
    this._api.post('registerUser.php', body.toString()).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      this._auth.setAuth(true);
      this._router.navigate(['']);
    }, (error) => {
      const obj = error.error.error;

      const element = document.getElementsByClassName('alert')[0] as HTMLElement;
      element.style.display = 'block';
      element.innerHTML = obj.split('\\r\\n').join('<br/>').split('\"').join('');
    });
  }

}
