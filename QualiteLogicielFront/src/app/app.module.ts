import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ComponentsModule} from "./components/components.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DeviceModule} from "./pages/device/device.module";
import {ProfilModule} from "./pages/profil/profil.module";
import {AuthModule} from "./pages/auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    DeviceModule,
    ProfilModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
