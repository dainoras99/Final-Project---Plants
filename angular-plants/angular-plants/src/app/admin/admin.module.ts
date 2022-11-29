import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './components/panel/panel.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AdminComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatExpansionModule,
  ]
})
export class AdminModule { }
