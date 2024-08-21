import { Component, OnInit } from '@angular/core';
import { BaseService } from './resources/base.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){

  }
  ngOnInit(): void {
  }
  title = 'lifebank';
  items:any

 
}
