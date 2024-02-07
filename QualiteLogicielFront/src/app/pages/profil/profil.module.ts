import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilInfoComponent } from './profil-info/profil-info.component';
import { ProfilListComponent } from './profil-list/profil-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../auth.guard";

const profilRoutes: Routes = [
  { path: 'profil/:search', component: ProfilListComponent, canActivate: [AuthGuard] },
  { path: 'profil/info/:id', component: ProfilInfoComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    ProfilInfoComponent,
    ProfilListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profilRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ProfilModule { }
