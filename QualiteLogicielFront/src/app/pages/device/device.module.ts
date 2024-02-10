import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../auth.guard";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

const materielRoutes: Routes = [
  { path: 'device/search/:search', component: DeviceListComponent, canActivate: [AuthGuard] },
  { path: 'device/info/:id', component: DeviceInfoComponent, canActivate: [AuthGuard] },
  { path: 'device/add', component: DeviceAddComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    DeviceInfoComponent,
    DeviceListComponent,
    DeviceAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(materielRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule
  ]
})
export class DeviceModule { }
