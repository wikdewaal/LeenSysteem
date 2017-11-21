import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LeningService } from '../services/lening.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-lening',
  templateUrl: './lening.component.html',
  styleUrls: ['./lening.component.css']
})
export class LeningComponent implements OnInit {
  items: Observable<any[]>;
  HardwareArray = [];

  HardwareLijst: AngularFireList<any>;
  hardwareList = [];
  keyList = [];

  gebruikerID = '';

  naam: string;
  aantal: number;
  beschrijving: string;
  type: string;
  bool: boolean;


  constructor(db: AngularFireDatabase, public leningService: LeningService, private loginService: LoginService) {
    this.gebruikerID = this.loginService.userid;
    console.log(this.gebruikerID);
    this.HardwareLijst = db.list('hardware');

    this.items = this.HardwareLijst.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  reserverenHardware() {
    // Tonen van confirm dialog
    if (confirm('Je probeert de volgende hardware te reserveren:\n\n'
        + this.hardwareList.join('\n') + '\n\nKlopt dit?'
      )) {
      // Zet de bestelde hardware door naar de service
      for (const hardwareStuk of this.HardwareArray) {
        console.log(hardwareStuk);
        this.leningService.ReserverenHardware( hardwareStuk['naam'], hardwareStuk['type'], hardwareStuk['aantal'], this.gebruikerID);
      }

      this.hardwareList = [];
      this.HardwareArray = [];
      this.keyList = [];

    }
    else {
      // doe niks
    }
  }


  CheckBoxCheck(naam, type, aantal, key) {
    this.bool = (this.keyList.indexOf(key) === -1);

    if (this.bool) {
      // Voeg de gekozen hardware toe aan een array

      this.HardwareArray.push({key: key, naam: naam, type: type, aantal: aantal});
      this.hardwareList.push(naam + ', type ' + type);
      this.keyList.push(key);
    } else {
      this.HardwareArray.splice(this.keyList.indexOf(key), 1);
      this.hardwareList.splice(this.keyList.indexOf(key), 1);
      this.keyList.splice(this.keyList.indexOf(key), 1);
    }
  }

  checkVoorraad(key: string, aantal: number) {
    if (aantal < 1) {
      return true;
    }
  }



  ngOnInit() {
  }

}
