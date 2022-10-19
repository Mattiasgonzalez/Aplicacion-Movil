import { DriversListService } from './../../services/drivers-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { destroyView } from '@ionic/angular/directives/navigation/stack-utils';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  constructor(
      private driversListService: DriversListService,
      private router: Router,
      private storage: Storage) { 
    this.loadData();
  }


  name = '';

  driverList=[];
  coleccion = [];

  async loadData(){
    this.driverList = await this.driversListService.getDataDriversList();
    this.name = await this.storage.get('session');
  }

  ngOnInit() {
  }

  doRefresh(evento) {
    setTimeout(() => {
      evento.target.complete();
      this.coleccion = this.driverList;
    }, 2000);
  }

  async onClick(index){
    await this.seatsHandler(index);
    // Destruimos la vista al salir para poder cargar la animacion denuevo.
    this.router.navigate(['/home'], {replaceUrl: true});
    
  }

  async seatsHandler(index){
    console.log(this.coleccion[index].seatsAvailable)
    if(this.coleccion[index].seatsAvailable > 1){
      this.coleccion[index].seatsAvailable = this.coleccion[index].seatsAvailable - 1;
      await this.driversListService.updateSeatsDriversList(this.coleccion);
      await this.driversListService.addUserDrivePassangers(this.coleccion[index].userName, this.name)
    }else{
      this.coleccion[index].available = false;
      this.coleccion[index].seatsAvailable = 0
      await this.driversListService.updateSeatsDriversList(this.coleccion);
    }
  }

}
