import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';

import { HttpClientModule } from "@angular/common/http"
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { PlantCategoryMenuComponent } from './components/plant-category-menu/plant-category-menu.component'

const routes: Routes = [
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
    PlantCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
