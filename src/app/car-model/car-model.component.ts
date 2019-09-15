import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormArray, FormGroup} from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, tap, subscribeOn } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


import { Manufacturer } from '../_models/manufacturer.model';
import { CarManufacturerService } from '../_services/car-manufacturer.service';

import { Model } from '../_models/model.model';
import { CarModelService } from '../_services/car-model.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.css']
})
export class CarModelComponent implements OnInit {
  allManufacturers: any;
  carModelForm: any;
  allCarModels: any;
  message:  string;

  public imagePath1;
  imgURL1: any;

  public imagePath2;
  imgURL2: any;

  file1: File = null;
  file2 : File = null;


  constructor(
    private toastr: ToastrService,
    private carManufacturerService: CarManufacturerService,
    private carModelService: CarModelService,
    private formBuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.carModelForm = this.formBuilder.group({
      'mname' : ['', Validators.required],
      'manufacturer_id': ['', Validators.required],
      'color': ['', Validators.required],
      'year': ['', Validators.required],
      'registration_number': ['', Validators.required],
      'note': ['', Validators.required],
      'count': [0, Validators.required],
      'image_url_1': [null, Validators.required],
      'image_url_2': [null,Validators.required]
    });

    this.spinnerService.show();
    this.carManufacturerService.getAllManufacturers().subscribe(data => {
             this.allManufacturers = data;
             this.spinnerService.hide();
        });
  }


  onFile1Change(event){
    this.file1 = <File>event.target.files[0];
    this.carModelForm.get('image_url_1').setValue(event.target.files[0]);
    
    // var reader = new FileReader();
    // this.imagePath1 = this.file1;
    // reader.readAsDataURL(this.file1); 
    // reader.onload = (_event) => { 
    //   this.imgURL1 = reader.result; 
    // }
  }
  onFile2Change(event){
    this.file2 = <File>event.target.files[0];
    this.carModelForm.get('image_url_2').setValue(<File>event.target.files[0]);

    // var reader = new FileReader();
    // this.imagePath2 = this.file2;
    // reader.readAsDataURL(this.file2); 
    // reader.onload = (_event) => { 
    //   this.imgURL2 = reader.result; 
    //   }
    }

  formSubmit(carModel: Model){    
    //const carModel = this.carModelForm.value;
    this.spinnerService.show();
    const input = new FormData();

    input.append('mname', carModel.mname);
    input.append('manufacturer_id',carModel.manufacturer_id);
    input.append('color', carModel.color);
    input.append('year', carModel.year);
    input.append('registration_number', carModel.registration_number);
    input.append('note', carModel.note);
    input.append('count', carModel.count);
    input.append('image_url_1',this.file1);
    input.append('image_url_2', this.file2);

    
    this.carModelService.createCarModel(input).subscribe(response => {
      if(response.status=="success"){
        this.toastr.success(response.message, 'Success', {timeOut: 5000});
        this.carModelForm.reset();
        this.spinnerService.hide();

      }else{
        this.toastr.error(response.errors, 'Error', {timeOut: 5000})
        this.spinnerService.hide();

      }
    });
  }


}
