import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./pages/connexion/connexion.component";
import {AccueilComponent} from "./pages/accueil/accueil.component";

const routes: Routes = [
  {path: "connexion", component: ConnexionComponent},
  {path: "accueil", component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
