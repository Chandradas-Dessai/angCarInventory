import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarManufacturerComponent } from './car-manufacturer/car-manufacturer.component';
import { CarModelComponent } from './car-model/car-model.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
  path: '',
  component: CarManufacturerComponent
  },
  {
    path:'car-model',
    component: CarModelComponent
  },
  {
    path:'inventory',
    component: InventoryComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
