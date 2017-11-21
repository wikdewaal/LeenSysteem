import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private router: Router, public loginService: LoginService) { }

  login() {
    this.loginService.login(this.email, this.password);
    this.email = this.password = '';
  }

  ngOnInit() {
  }
}
