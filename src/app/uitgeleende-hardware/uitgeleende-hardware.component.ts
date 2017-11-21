import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {myService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-uitgeleende-hardware',
  templateUrl: './uitgeleende-hardware.component.html',
  styleUrls: ['./uitgeleende-hardware.component.css']
})
export class UitgeleendeHardwareComponent implements OnInit {
  users: AngularFireList<any[]>;
  userList: Observable<any[]>;

  totalList: Array<any> = [];

  constructor(db: AngularFireDatabase, public _myService: myService, private router: Router) {
      this.users = db.list('users');

      this.userList = this.users.snapshotChanges().map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
        }));
      });

      this.userList.forEach(users => {
          users.forEach(user => {
            const userHardware = db.list('UserHardware/' + user['key'] + '/');
            const userHardwareList = userHardware.snapshotChanges().map(changes => {
              return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
              }));
            });
            userHardwareList.forEach(hardwares => {
              this.totalList.push({username: user.voornaam + ' ' + user.achternaam, countedItems: hardwares.length, userKey: user.key});
            });
          });
        }
      );
  }

  doorSturen(gebruikeruid: string, username: string) {
    this._myService.setData({id: gebruikeruid, username: username});
    this.router.navigate(['/afhandelen-lening']);
  }

  ngOnInit() {
  }

}
