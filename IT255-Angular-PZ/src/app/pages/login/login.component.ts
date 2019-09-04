import { ApiService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    pid: new FormControl(),
    password: new FormControl()
  });

  constructor(private _api: ApiService, private _router: Router, private _auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigateByUrl('home');
    }
  }

  login() {

    const body = new HttpParams()
      .set('pid', this.loginForm.value.pid)
      .set('password', this.loginForm.value.password);
    this._api.post('loginUser.php', body.toString()).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      !!data.admin ? localStorage.setItem('admin', data.admin) : '';
      this._auth.setAdmin(true);
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
