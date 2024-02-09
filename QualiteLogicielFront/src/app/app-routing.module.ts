import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {NouveauMaterielComponent} from "./pages/nouveau-materiel/nouveau-materiel.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: "accueil", component: AccueilComponent, canActivate: [AuthGuard] },
  { path: "nouveau-materiel", component: NouveauMaterielComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
