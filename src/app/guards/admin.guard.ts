import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private auth: AngularFireAuth, public db: AngularFireDatabase){}

  canActivate(): Observable<boolean> {
    return this.localCheck().take(1).map(user => {
        localStorage.setItem('type', user.type);
        localStorage.setItem('uid', user.key);
        return user.type === 'admin';
    }).do(auth => !auth ? this.router.navigate(['/home']) : true);
}

  localCheck(): Observable<any> {
    return this.db.object('users/' + this.auth.auth.currentUser.uid).valueChanges();
 }
}
