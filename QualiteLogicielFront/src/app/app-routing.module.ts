import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnexionComponent} from "./pages/connexion/connexion.component";
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {ProfilComponent} from "./pages/profil/profil.component";
import {MaterielComponent} from "./pages/materiel/materiel.component";

const routes: Routes = [
  {path: "connexion", component: ConnexionComponent},
  {path: "change-password/:id", component: ChangePasswordComponent},
  {path: "accueil", component: AccueilComponent},
  {path: "profil", component: ProfilComponent},
  {path: "materiel", component: MaterielComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
