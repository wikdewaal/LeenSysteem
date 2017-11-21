import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginService } from '../services/login.service';
@Injectable()
export class HardwareService {
  items: Observable<any[]>;


  constructor(private router: Router, public db: AngularFireDatabase, private loginService: LoginService) {
    this.items = db.list('hardware').valueChanges();
  }

  ToevoegenHardware(naamdb: string, beschrijvingdb: string, typedb: string, aantaldb: string) {
    const afList = this.db.list('hardware');
    afList.push({ naam: naamdb, beschrijving: beschrijvingdb, type: typedb, aantal: aantaldb});
  }

}
