import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../_services/inventory.service';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  inventory: any;
  singleInv: any;
   //publicURL: string = 'http://127.0.0.1:8000/';
  //publicURL: string = 'http://minicarinventory.epizy.com/';
  publicURL: string = 'http://cinventory.000webhostapp.com/';

  img1: any;
  img2: any;

  constructor(private toastr: ToastrService,
    private InventoryService: InventoryService
    ) { }

  ngOnInit() {

  this.listInventory();
  
  }

  listInventory(){
    this.InventoryService.getInventory().subscribe(data => {
        this.inventory = data;
    });
  }

  loadInventoryToView(mId: string){
    
    this.InventoryService.getInventoryDetailsById(mId).subscribe(Inv =>{
      this.singleInv = Inv;

      this.img1 =  this.publicURL+this.singleInv.image_url_1;
      this.img2 =  this.publicURL+this.singleInv.image_url_2;
    });
  }

  deleteInventoryModel(InvId: any){
    if(confirm(`Are you sure you want to delete the Inventory Model with id ${InvId}`)){
    this.InventoryService.deleteInventoryById(InvId).subscribe(response => {
      if(response.status=="success"){
        this.toastr.success(response.message, 'Success', {timeOut: 5000});
        this.listInventory();
      }else{
        this.toastr.error('Unable to delete Inventory Model!', 'Error', {timeOut: 5000})
      }
      });
  }
  }

}
