import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationService } from './services/authentication.service';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showSearchResults = true;

  constructor(private dialogRef: MatDialog, public authenticationService: AuthenticationService, private sideNavService: SidenavService) { }

  openDialog() {
    this.dialogRef.open(RegistrationComponent, {
      height: '80%',
      width: '60%'
    });
  }

  openLoginDialog() {
    this.dialogRef.open(LoginComponent, {
      height: '45%',
      width: '30%'
    });
  }

  refreshSearchResults() {
    this.showSearchResults = false;
    setTimeout(() => this.showSearchResults = true);
  }
}
