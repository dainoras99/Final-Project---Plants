import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { CheckouthomeComponent } from '../components/checkouthome/checkouthome.component';
import { CheckoutparcelComponent } from '../components/checkoutparcel/checkoutparcel.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { PlantDetailsComponent } from '../components/plant-details/plant-details.component';
import { PlantListComponent } from '../components/plant-list/plant-list.component';

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
  {path: '', redirectTo: '/plants', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }