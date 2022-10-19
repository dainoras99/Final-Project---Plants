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
    PlantDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
