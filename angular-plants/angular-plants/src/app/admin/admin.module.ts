import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';


@NgModule({
  declarations: [
    AdminComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
