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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { PlantDetailsComponent } from './components/plant-details/plant-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CheckouthomeComponent } from './components/checkouthome/checkouthome.component';
import { CheckoutparcelComponent } from './components/checkoutparcel/checkoutparcel.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'checkout/home', component: CheckouthomeComponent},
  {path: 'checkout/parcel', component: CheckoutparcelComponent},
  {path: 'checkout', component: CheckoutComponent},
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
    DrawerComponent,
    CartComponent,
    CheckoutComponent,
    AboutUsComponent,
    CheckouthomeComponent,
    CheckoutparcelComponent,
    OrdersComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})

export class AppModule { }