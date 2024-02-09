import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InputFieldComponent } from './input-field/input-field.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import { DeviceCardComponent } from './device-card/device-card.component';



@NgModule({
  declarations: [
    HeaderComponent,
    InputFieldComponent,
    DeviceCardComponent
  ],
  exports: [
    InputFieldComponent,
    HeaderComponent,
    DeviceCardComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLink
  ]
})
export class ComponentsModule { }
