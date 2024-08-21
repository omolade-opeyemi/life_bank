import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { BaseService } from '../resources/base.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {

  @Input() itemList:any;
  constructor(private endpoint:BaseService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  items:any;
  previous: any;
  next:any;
  currentPage :any;
  nextPage:any

  showSuccess() {
    this.toastr.success('Vehicles successfully loaded');
  }

  showError(){
    this.toastr.error('Error', 'Something went wrong. Try again', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }
 
  

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(){
    this.spinner.show();
    this.endpoint.getVehicles().subscribe(
      (data:any)=>{
        this.spinner.hide();
        if( !data){
          this.showError();
        }else{
          this.items = data.results;
          this.previous = data.previous;
          this.next = data.next;
          this.currentPage = 1
          this.showSuccess();
          if(this.next != "null"){
            this.nextPage = 2;
          }
        }
      },(error) => {
        this.showError();
        
      })
  }

  previousePage(){
    this.spinner.show();

    this.endpoint.paginate(this.currentPage).subscribe(
      (data:any)=>{
        this.spinner.hide()
        if( !data){
          this.showError();
        }else{
          this.items = data.results;
          this.previous = data.previous;
          this.next = data.next;
          this.showSuccess();
          if(this.previous != null){
            this.currentPage = this.currentPage - 1;
            this.nextPage = this.nextPage - 1;
          }
        }
      },(error) => {
        this.showError();
      }
    )

  }

  pagination(){
    this.spinner.show();

    this.endpoint.paginate(this.nextPage).subscribe(
      (data:any)=>{
        this.spinner.hide()
        if( !data){
          console.log('System Error');
        }else{
          this.items = data.results;
          this.previous = data.previous;
          this.next = data.next;
          this.showSuccess();
          if(this.next != null){
            this.currentPage = this.currentPage + 1;
            this.nextPage = this.nextPage + 1;
            console.log(this.nextPage);
            
          }
        }
      },(error) => {
        this.showError();

      }
    )
    
  }

}
