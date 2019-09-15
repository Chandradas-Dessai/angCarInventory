import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  inventory: any;
  singleInv: any;
   //publicURL: string = 'http://127.0.0.1:8000/';
  publicURL: string = 'https://laravelbackend.herokuapp.com/';
  //publicURL: string = 'https://cinventory.000webhostapp.com/';

  img1: any;
  img2: any;

  constructor(private toastr: ToastrService,
    private InventoryService: InventoryService,
    private spinnerService: Ng4LoadingSpinnerService
    ) { }

  ngOnInit() {

  this.listInventory();
  
  }

  listInventory(){
    this.spinnerService.show();
    this.InventoryService.getInventory().subscribe(data => {
        this.inventory = data;
        this.spinnerService.hide();
    });
  }

  loadInventoryToView(mId: string){
    this.spinnerService.show();
    this.InventoryService.getInventoryDetailsById(mId).subscribe(Inv =>{
      this.singleInv = Inv;

      this.img1 =  this.publicURL+this.singleInv.image_url_1;
      this.img2 =  this.publicURL+this.singleInv.image_url_2;
      this.spinnerService.hide();
    });
  }

  deleteInventoryModel(InvId: any){
    this.spinnerService.show();
    if(confirm(`Are you sure you want to delete the Inventory Model with id ${InvId}`)){
   
    this.InventoryService.deleteInventoryById(+InvId).subscribe(response => {
      if(response.status=="success"){
        this.toastr.success(response.message, 'Success', {timeOut: 5000});
        this.listInventory();
        this.spinnerService.hide();
      }else{
        this.toastr.error('Unable to delete Inventory Model!', 'Error', {timeOut: 5000})
        this.spinnerService.hide();
      }
      });
  }
  }

}
