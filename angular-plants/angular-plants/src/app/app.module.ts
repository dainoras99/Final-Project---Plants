import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';

import { HttpClientModule } from "@angular/common/http"
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { PlantCategoryMenuComponent } from './components/plant-category-menu/plant-category-menu.component';
import { SearchComponent } from './components/search/search.component'

import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PlantDetailsComponent } from './components/plant-details/plant-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { DrawerComponent } from './components/drawer/drawer.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'

const routes: Routes = [
  {path: 'plants/:id', component: PlantDetailsComponent},
  {path: 'search/:keyword', component: PlantListComponent},
  {path: 'category/:id', component: PlantListComponent},
  {path: 'category', component: PlantListComponent},
  {path: 'plants', component: PlantListComponent},
  {path: '', redirectTo: '/plants', pathMatch: 'full'},
  {path: '**', redirectTo: '/plants', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    PlantCategoryMenuComponent,
    SearchComponent,
    RegistrationComponent,
    LoginComponent,
    PlantDetailsComponent,
    CartStatusComponent,
    DrawerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
