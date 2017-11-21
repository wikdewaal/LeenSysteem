import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class LeningService {
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.items = db.list('UserHardware').valueChanges();

  }

  ReserverenHardware(inaam, type, iaantal, gebruikeruid: string) {
    //UID zodat je weet welke gebruiker het leent
    const afList = this.db.list('UserHardware/' + gebruikeruid + '/');
    console.log(inaam + 'test');
    afList.push({ aantal: iaantal, type: type, naam: inaam});
    const hardware = this.db.list('hardware/');
    const hardwareList = hardware.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });

    console.log('test');
    const DBEntries = this.db.list('hardware/');

    let done = false;

    hardwareList.forEach(hardwarePieces => {
      if (!done) {
        console.log(hardwarePieces);
        hardwarePieces.forEach(hardwarePiece => {
          // console.log(hardwarePiece);
          if (hardwarePiece['naam'] === inaam && hardwarePiece['type'] === type) {
            const huidigAantal = hardwarePiece['aantal'];
            const aantalInDB = Number.parseInt(huidigAantal) - 1;
            DBEntries.update(hardwarePiece['key'], {aantal: aantalInDB});
            done = true;
          }
        });
      }
    });
  }
}


