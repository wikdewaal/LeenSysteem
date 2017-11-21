import {Component, Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfhandelenLeningService } from '../services/afhandelen-lening.service';
import {myService} from '../services/data.service';

@Component({
  selector: 'app-afhandelen-lening',
  templateUrl: './afhandelen-lening.component.html',
  styleUrls: ['./afhandelen-lening.component.css']
})

@Injectable()
export class AfhandelenLeningComponent implements OnInit {
  items: Observable<any[]>;
  userHardwareLijst: AngularFireList<any>;
  hardwareList = []; // list van hardware keys
  HardwareArray = []; // array van namen en typen hardware
  keyList = [];
  gebruikerID = '';
  gebruikerNaam = '';
  naam: string;
  type: string;
  bool: boolean;

  constructor(db: AngularFireDatabase, public afhandelenService: AfhandelenLeningService, private _myService: myService) {
    const userData = _myService.getData();
    this.gebruikerID = userData['id'];
    this.gebruikerNaam = userData['username'];

    this.userHardwareLijst = db.list('UserHardware/' + this.gebruikerID + '/');
    this.items = this.userHardwareLijst.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  afhandelenLeningStudent() {
    // Tonen van confirm dialog
    if (confirm('U neemt de volgende hardware van de student aan:\n\n'
        + this.hardwareList.join('\n') + '\n\nKlopt dit?'
      )) {
      // VIA EEN SERVICE HARDWARE TOEVOEGEN VAN DE GEBRUIKER NAAR INGELEVERD
      for (const naam of this.HardwareArray) {
         this.afhandelenService.InleverenHardware(naam, this.gebruikerID);
      }
      // PAK ALLE SLEUTELS DIE VOORKWAMEN EN VERWIJDER DEZE ITEMS UIT USERHARDWARE

      for (let sleutel of this.HardwareArray) {
        sleutel = sleutel['key'];
        this.userHardwareLijst.remove(sleutel);
      }

      this.hardwareList = [];
      this.HardwareArray = [];
      this.keyList = [];
    }
    else {
      // doe niks
    }
  }

  // functie bij het veranderen van een checkbox
  CheckBoxCheck(key, naam, type, aantal) {

    this.bool = (this.keyList.indexOf(key) === -1);

    if (this.bool) {
      this.HardwareArray.push({key: key, naam: naam, type: type, aantal: aantal});
      this.hardwareList.push(naam + ', type ' + type);
      this.keyList.push(key);
    } else {
      this.HardwareArray.splice(this.keyList.indexOf(key), 1);
      this.hardwareList.splice(this.keyList.indexOf(key), 1);
      this.keyList.splice(this.keyList.indexOf(key), 1);
    }
  }
  ngOnInit() {
  }
}
