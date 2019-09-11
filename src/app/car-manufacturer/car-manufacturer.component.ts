import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

import { Manufacturer } from '../_models/manufacturer.model';
import { CarManufacturerService } from '../_services/car-manufacturer.service';
//import { timeout } from 'q';



@Component({
  selector: 'app-car-manufacturer',
  templateUrl: './car-manufacturer.component.html',
  styleUrls: ['./car-manufacturer.component.css']
})
export class CarManufacturerComponent implements OnInit {
  manufacturerForm: any;
  allManufacturers: any;
  manufacturerToUpdate = null;
  message:  string;


  constructor(
    private toastr: ToastrService,
    private carManufacturerService: CarManufacturerService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.manufacturerForm = this.formBuilder.group({
      name:['', Validators.required]
    })

    this.listAllManufacturers();
  }


  listAllManufacturers(){
    this.carManufacturerService.getAllManufacturers().subscribe(data => {
        this.allManufacturers = data;
    });
  }
 
  loadManufacturerToEdit(mId: string){
    
    this.carManufacturerService.getManufacturerById(mId).subscribe(man =>{
      //this.manufacturerToUpdate = man.id;
      //this.manufacturerForm.controls['name'].setValue(man.name);
    });
  }

  formSubmit(manufacturer: Manufacturer){
    //const manufacturer1= this.manufacturerForm.value;

     const input = new FormData();

     input.append('name', manufacturer.name);

   // if(this.manufacturerToUpdate == null){
    this.carManufacturerService.createManufacturer(input).subscribe(response => {
      if(response.status=="success"){
        this.toastr.success(response.message, 'Success', {timeOut: 5000});
        this.listAllManufacturers();
        this.manufacturerForm.reset();
      }else{
        this.toastr.error(response.message, 'Error', {timeOut: 5000})
      }
    });
    //}

  }

  // createManufacturer(manufacturer: Manufacturer){
  //   this.carManufacturerService.createManufacturer(manufacturer).subscribe(response => {
  //     if(response.status=="success"){
  //       this.toastr.success(response.message, 'Success', {timeOut: 5000});
  //       this.listAllManufacturers();
  //       this.manufacturerForm.reset();
  //     }else{
  //       this.toastr.error(response.message, 'Error', {timeOut: 5000})
  //     }
  //   });
  // }

  // updateManufacturer(manufacturer:Manufacturer){
  //   manufacturer.id = this.manufacturerToUpdate;

  //   this.carManufacturerService.updateManufacturer(manufacturer).subscribe(
  //     () => {
  //     this.message = 'Manufacturer Updated Successfully!';
  //     this.listAllManufacturers();
  //     this.manufacturerToUpdate = null;
  //     this.manufacturerForm.reset();
  //   });
  // }

deleteEmployee(mId: string){
  if(confirm(`Are you sure you want to delete the Manufacturer with id ${mId}`)){
  this.carManufacturerService.deleteManufacturerById(mId).subscribe(response => {
    // if(response.status=="success"){
    //   this.toastr.success(response.message, 'Success', {timeOut: 5000});
      this.listAllManufacturers();
      this.manufacturerForm.reset();
   // }else{
      //this.toastr.error('Unable to delete Manufacturer!', 'Error', {timeOut: 5000})
   // }
    });
}
}

}

