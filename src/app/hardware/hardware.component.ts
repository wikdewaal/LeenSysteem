import { Component, OnInit } from '@angular/core';
import { HardwareService } from '../services/hardware.service';

import {Router} from '@angular/router';
@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent implements OnInit {
  naam: string;
  beschrijving: string;
  type: string;
  aantal: number;
  errormsg: string;
  succesmsg: string;
  selected: string;
  constructor(private router: Router, public hardwareService: HardwareService) { }


  ToevoegenHardware(){
    if (this.aantal > 10000){
      this.errormsg = 'Het aantal mag maximaal 10.000 zijn!';
    }
    if (this.aantal < 10001){
      if (confirm('Je staat op het punt de volgende\nhardware toe te voegen:\n\n'
      + 'Naam: ' + this.naam + '\n'
      + 'Type: ' + this.type + '\n'
      + 'Beschrijving: ' + this.beschrijving + '\n'
      + 'Aantal: ' + this.aantal + '\n'
      )) {
        this.hardwareService.ToevoegenHardware(this.naam, this.beschrijving, this.type, this.aantal.toString());
      	this.errormsg = ''; this.naam = ''; this.beschrijving = ''; this.type = ''; this.aantal = null;
        this.succesmsg = 'De hardware is zojuist toegevoegd';
    } else {
    // Do nothing!
}
    }
  }


  ngOnInit() {
  }

}
