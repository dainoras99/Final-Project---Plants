import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from '../guards/admin-guard.guard';
import { AdminComponent } from './components/admin/admin.component';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
    {path: 'admin', component: AdminComponent},
    {path: 'panel', component: PanelComponent, canActivate: [AdminGuardGuard]},
    {path: '', redirectTo: '/admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
