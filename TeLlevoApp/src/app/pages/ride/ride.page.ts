import { DriversListService } from './../../services/drivers-list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { destroyView } from '@ionic/angular/directives/navigation/stack-utils';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  constructor(
      private driversListService: DriversListService,
      private router: Router,
      private storage: Storage,
      private platform: Platform) { 
    this.loadData();
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/home'])
    });
  }


  name = '';
  user={name:''};

  driverList=[];
  coleccion = [];

  async loadData(){
    this.driverList = await this.driversListService.getDataDriversList();
    this.name = await this.storage.get('session');
    this.user = await this.storage.get(this.name);
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

  //hora salida, direccion, auto, nombre chofer

  async seatsHandler(index){
    console.log(this.coleccion[index].seatsAvailable)
    if(this.coleccion[index].seatsAvailable >= 1){
      this.coleccion[index].seatsAvailable = this.coleccion[index].seatsAvailable - 1;
      await this.driversListService.updateSeatsDriversList(this.coleccion);
      await this.driversListService.addUserDrivePassangers(this.coleccion[index].userName, {name: this.user.name, userName: this.name});
      await this.driversListService.updateUserRide(this.name, {driversUserName: this.coleccion[index].userName,
                                                    driversName: this.coleccion[index].name,
                                                    price: this.coleccion[index].price,
                                                    direction: this.coleccion[index].direction,
                                                    description: this.coleccion[index].description,
                                                    time: this.coleccion[index].time
                                                    });
    }else{
      this.coleccion[index].available = false;
      this.coleccion[index].seatsAvailable = 0
      await this.driversListService.updateSeatsDriversList(this.coleccion);
    }
  }

}
