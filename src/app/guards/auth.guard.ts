import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth, public db: AngularFireDatabase){}

  canActivate(): Observable<boolean> {
    return this.localCheck().take(1).map(user => {
        localStorage.setItem('type', user.type);
        localStorage.setItem('uid', user.key);
        return user.type === 'student';
    }).do(auth => !auth ? this.router.navigate(['/home']) : true);
}

  localCheck(): Observable<any> {
    return this.db.object('users/' + this.auth.auth.currentUser.uid).valueChanges();
 }
}
