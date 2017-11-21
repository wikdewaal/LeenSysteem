import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guards/auth.guard';
import { HardwareComponent } from './hardware/hardware.component';
import { FormsModule } from '@angular/forms';
import { HardwareService } from './services/hardware.service';
import { AdminGuard } from './guards/admin.guard';
import { LeningComponent } from './lening/lening.component';
import { StudentComponent } from './student/student.component';
import { UitgeleendeHardwareComponent } from './uitgeleende-hardware/uitgeleende-hardware.component';
import { AfhandelenLeningComponent } from './afhandelen-lening/afhandelen-lening.component';
import { GlobalApp } from './global';
import { LeningService } from './services/lening.service';
import { AfhandelenLeningService } from './services/afhandelen-lening.service';
import { myService } from './services/data.service';

const appRoutes: Routes = [
  {
    path: 'admin',  // localhost/admin
    canActivate: [AdminGuard],
    component: AdminComponent,
},
  {
    // UC1 HARDWARE TOEVOEGEN
    path: 'hardware',  // localhost/hardware
    canActivate: [AdminGuard], // Admin guard (bekijkt of iemand is ingelogd en geauthoriseerd is!)
    component: HardwareComponent
},
{
  // UC2 Inzien uitgeleende hardware
  path: 'uitgeleende-hardware', // localhost/reserveer
  canActivate: [AdminGuard], // auth guard (bekijkt of iemand is ingelogd)
  component: UitgeleendeHardwareComponent
},
{
  // UC4  Afhandelen teruggebrachte lening
  path: 'afhandelen-lening', // localhost/reserveer
  canActivate: [AdminGuard], // auth guard (bekijkt of iemand is ingelogd)
  component: AfhandelenLeningComponent
},
  {
    path: 'login',  // localhost/inloggen
    component: LoginComponent
},
{
  path: '', // home pagina standaard pagina
  component: HomeComponent
},
{
  // UC3 LENEN HARDWARE
  path: 'lening', // localhost/reserveer
  canActivate: [AuthGuard], // auth guard (bekijkt of iemand is ingelogd)
  component: LeningComponent
},
{
  path: 'student', // localhost/reserveer
  canActivate: [AuthGuard], // auth guard (bekijkt of iemand is ingelogd)
  component: StudentComponent
}

];


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HardwareComponent,
    LeningComponent,
    StudentComponent,
    UitgeleendeHardwareComponent,
    AfhandelenLeningComponent,

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
  ],
  providers: [LoginService, AuthGuard, HardwareService, AdminGuard, GlobalApp, LeningService, AfhandelenLeningService, myService],
  bootstrap: [AppComponent]
})
export class AppModule { }
