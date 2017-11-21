import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../services/login.service';
import {GlobalApp} from '../global';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, public app: GlobalApp) { }

  ngOnInit() {

  }

}
