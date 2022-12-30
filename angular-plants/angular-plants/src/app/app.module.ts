import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { HttpClientModule } from "@angular/common/http"
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { PlantCategoryMenuComponent } from './components/plant-category-menu/plant-category-menu.component';
import { SearchComponent } from './components/search/search.component'
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
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
import { CartService } from './services/cart.service';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GiftCardComponent } from './components/gift-card/gift-card.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      },
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/plants',
    pathMatch: 'full'
  }
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
    MainLayoutComponent,
    AdminLayoutComponent,
    GiftCardComponent,
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
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
  ],
  providers: [ProductService, CartService],
  bootstrap: [AppComponent]
})

export class AppModule { }