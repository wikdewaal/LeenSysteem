import { Component, OnInit } from '@angular/core';
import {GlobalApp} from '../global';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public app: GlobalApp) { }

  ngOnInit() {
  }

}
