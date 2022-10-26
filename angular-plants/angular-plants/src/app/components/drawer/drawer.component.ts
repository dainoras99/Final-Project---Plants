import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { CartSession } from 'src/app/common/cart-session';
import { CartItem } from 'src/app/common/cart-item';
import { User } from 'src/app/common/user';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav!: MatSidenav;
  constructor(private sideNavService: SidenavService, private dialogRef: MatDialog, public authenticationService: AuthenticationService,
    private changeDetectorRefs: ChangeDetectorRef) { }
  showSearchResults = true;

  opened: any = false;
  
  ngOnInit(): void {
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
      this.sidenav.toggle();
    });

  } 

  
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

  onOpen(): void {
    console.log(this.opened);
  }
}
