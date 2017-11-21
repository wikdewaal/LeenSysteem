import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router/src';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginService } from './login.service';
import {isNull} from "util";

@Injectable()
export class AfhandelenLeningService {

  items: Observable<any[]>;


  constructor(public db: AngularFireDatabase) {
    this.items = db.list('ingeleverd').valueChanges();
  }

  InleverenHardware(args: any[], gebruikeruid: string) {
    // UID zodat je weet welke gebruiker wat heeft ingeleverd
    const afList = this.db.list('ingeleverd/' + gebruikeruid + '/');
    const naam = args['naam'];
    const type = args['type'];
    const aantal = args['aantal'];
    afList.push({ naam: naam, type: type, aantal: aantal});

    const hardware = this.db.list('hardware/');
    const hardwareList = hardware.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });

    const DBEntries = this.db.list('hardware/');
    let done = false;

    hardwareList.forEach(hardwarePieces => {
      if (!done) {
        console.log(hardwarePieces);
        hardwarePieces.forEach(hardwarePiece => {
          // console.log(hardwarePiece);
          if (hardwarePiece['naam'] === naam && hardwarePiece['type'] === type) {
            const huidigAantal = hardwarePiece['aantal'];
            const aantalInDB = Number.parseInt(huidigAantal) + 1;
            DBEntries.update(hardwarePiece['key'], {aantal: aantalInDB});
            done = true;
          }
        });
      }
    });
  }
}
