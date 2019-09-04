import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService implements OnInit {

  private $isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private $isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin: Observable<boolean> = this.$isAdmin.asObservable();
  isAuth: Observable<boolean> = this.$isAuth.asObservable();

  constructor() {
    this.$isAuth.next(this.isAuthenticated());
    this.$isAdmin.next(this.isAdministrator());
  }

  ngOnInit() {
    
  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');
    if (token != null) {
      this.$isAuth.next(true);
      return true;
    }
    else {
      this.$isAuth.next(false);
      return false;
    }
  }

  public isAdministrator(): boolean {
    const admin = localStorage.getItem('admin');
    if (admin != null) {
      this.$isAdmin.next(true);
      return true;
    }
    this.$isAdmin.next(false);
    return false;
  }

  public getAuth() {
    return this.isAuth;
  }

  public setAuth(auth: boolean) {
    this.$isAuth.next(auth);
  }

  public setAdmin(value: boolean){
    !value ?(!!localStorage.getItem('admin') ? localStorage.removeItem('admin') : '') : '';
    this.$isAdmin.next(value);
  }

}
