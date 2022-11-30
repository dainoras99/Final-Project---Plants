import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrdersManagementComponent } from './components/orders-management/orders-management.component';
import { PlantsManagementComponent } from './components/plants-management/plants-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';


@NgModule({
  declarations: [
    AdminComponent,
    PanelComponent,
    OrdersManagementComponent,
    PlantsManagementComponent,
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
