import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { CheckouthomeComponent } from '../components/checkouthome/checkouthome.component';
import { CheckoutparcelComponent } from '../components/checkoutparcel/checkoutparcel.component';
import { GiftCardComponent } from '../components/gift-card/gift-card.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { PlantDetailsComponent } from '../components/plant-details/plant-details.component';
import { PlantListComponent } from '../components/plant-list/plant-list.component';

const routes: Routes = [
  {path: 'uzsakymai', component: OrdersComponent},
  {path: 'dovanu-kuponai', component: GiftCardComponent},
  {path: 'apie-mus', component: AboutUsComponent},
  {path: 'atsiskaitymas/i-namus', component: CheckouthomeComponent},
  {path: 'atsiskaitymas/i-pastomata', component: CheckoutparcelComponent},
  {path: 'atsiskaitymas', component: CheckoutComponent},
  {path: 'augalas/:name', component: PlantDetailsComponent},
  {path: 'ieskoti/:keyword', component: PlantListComponent},
  {path: 'kategorija/:id', component: PlantListComponent},
  {path: 'kategorija', component: PlantListComponent},
  {path: 'augalai', component: PlantListComponent},
  {path: '', redirectTo: '/augalai', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }