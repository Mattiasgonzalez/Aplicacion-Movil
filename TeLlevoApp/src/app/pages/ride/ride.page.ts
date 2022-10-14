import { DriversListService } from './../../services/drivers-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  constructor(private driversListService: DriversListService, private router: Router) { 
    this.loadData();
  }


  name = 'Pasajero';

  driverList=[];
  coleccion = [];

  async loadData(){
    this.driverList = await this.driversListService.getData();
  }

  ngOnInit() {
  }

  doRefresh(evento) {
    setTimeout(() => {
      evento.target.complete();
      this.coleccion = this.driverList;
    }, 2000);
  }

  onClick(index){
    this.removeItem(index)
    this.coleccion[index].available = false
    this.driversListService.addData(this.coleccion[index])
    this.router.navigate(['/home']);
  }

  async removeItem(index){
    await this.driversListService.removeItem(index);
  }

}
