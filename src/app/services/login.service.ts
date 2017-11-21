import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/first';


@Injectable()
export class LoginService {

  user: Observable<firebase.User>;
  public userid: string;
  public currentRole: string;
  userrole: boolean;
  fbUserData: Observable<any[]>;
  errormsg: string;

  constructor(private router: Router, private firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.userid = this.firebaseAuth.auth.currentUser.uid.toString();
        this.fbUserData = this.db.list('users/' + this.userid).valueChanges();
        this.fbUserData.forEach(element => {
          this.currentRole = element[2].toString();
          this.errormsg = '';
          localStorage.setItem('type', this.currentRole);
          if (this.currentRole == 'admin') {
            this.userrole = true;
            this.router.navigate(['/admin']);
          }
          else{
            this.userrole = false;
            this.router.navigate(['/student']);
          }
        });
      })
      .catch(err => {
        this.errormsg = 'Onjuist email of wachtwoord\nProbeer het opnieuw!';
        console.log('Something went wrong:', err.message);
        return false;
      });

  }

  logout() {
    this.firebaseAuth.auth.signOut();
    localStorage.removeItem('type');
    this.router.navigate(['/login']);
  }


}
