import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./pages/connexion/connexion.component";
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";

const routes: Routes = [
  {path: "connexion", component: ConnexionComponent},
  {path: "change-password/:id", component: ChangePasswordComponent},
  {path: "accueil", component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
