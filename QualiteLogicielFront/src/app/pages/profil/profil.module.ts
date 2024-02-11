import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilInfoComponent } from './profil-info/profil-info.component';
import { ProfilListComponent } from './profil-list/profil-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../auth.guard";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {ProfilAddComponent} from "./profil-add/profil-add.component";
import {MatSelectModule} from "@angular/material/select";
import {AppModule} from "../../app.module";
import {PipesModule} from "../../pipes/pipes.module";

const profilRoutes: Routes = [
  { path: 'profil/search/:search', component: ProfilListComponent, canActivate: [AuthGuard] },
  { path: 'profil/info/:id', component: ProfilInfoComponent, canActivate: [AuthGuard] },
  { path: 'profil/add', component: ProfilAddComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    ProfilInfoComponent,
    ProfilListComponent,
    ProfilAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profilRoutes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    PipesModule
  ]
})
export class ProfilModule { }
