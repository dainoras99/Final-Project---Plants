import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from '../guards/admin-guard.guard';
import { AdminComponent } from './components/admin/admin.component';
import { OrdersManagementComponent } from './components/orders-management/orders-management.component';
import { PanelComponent } from './components/panel/panel.component';
import { PlantsFormComponent } from './components/plants-form/plants-form.component';
import { PlantsManagementComponent } from './components/plants-management/plants-management.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';

const routes: Routes = [
    {path: 'admin', component: AdminComponent},
    {path: 'panel', component: PanelComponent, 
     children: [
      { path: '', redirectTo: '/panel/orders', pathMatch: 'full'}, 
      { path: 'users', component: UsersManagementComponent },
      { path: 'orders', component: OrdersManagementComponent },
      { path: 'plants', component: PlantsManagementComponent, children: [
        { path: 'form', component: PlantsFormComponent}
      ] }
    ]},
    {path: '', redirectTo: '/admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
