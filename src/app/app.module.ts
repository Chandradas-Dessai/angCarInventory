import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarManufacturerComponent } from './car-manufacturer/car-manufacturer.component';
import { CarModelComponent } from './car-model/car-model.component';

import { Manufacturer } from './_models/manufacturer.model';
import { Model } from './_models/model.model';

import { CarModelService } from './_services/car-model.service';
import { CarManufacturerService } from './_services/car-manufacturer.service';
import { InventoryService } from './_services/inventory.service';

import { NavComponent } from './nav/nav.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CarManufacturerComponent,
    CarModelComponent,
    InventoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [
    CarManufacturerService,
    CarModelService,
    InventoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
