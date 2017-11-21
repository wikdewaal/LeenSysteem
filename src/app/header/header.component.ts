import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import {GlobalApp} from '../global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roleType: string;
  constructor(private router: Router, private loginService: LoginService, public app: GlobalApp) { }

  logout() {
     this.loginService.logout();
  }

  ngOnInit() {
  }

}
