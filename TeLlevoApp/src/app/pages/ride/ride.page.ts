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

  users;
  name = '';
  user={name:''};

  driverList=[];
  coleccion = [];

  async loadData(){
    this.driversListService.readCol('driversList').subscribe(res => {
      this.driverList = res;
      this.coleccion = this.driverList;
    });
    this.name = await this.storage.get('session');
    this.users = await this.storage.get('users')
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].userName == this.name){
        this.user = this.users[index];
      }
    }
  }

  ngOnInit() {
  }

  doRefresh(evento) {
    setTimeout(() => {
      evento.target.complete();
      window.location.reload();
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
      for (let i = 0; i < this.coleccion.length; i++) {
        this.driversListService.createDoc(this.coleccion[i],'driversList',this.coleccion[i].userName);
        this.driversListService.createDoc(this.coleccion[i],this.coleccion[i].userName+'-drive',this.coleccion[i].userName)
      }
      await this.driversListService.updateSeatsDriversList(this.coleccion);
      this.driversListService.createDoc({name: this.user.name, userName: this.name}, this.coleccion[index].userName+'-drive-passangers',this.name)
      this.driversListService.createDoc({driversUserName: this.coleccion[index].userName,
        driversName: this.coleccion[index].name,
        price: this.coleccion[index].price,
        direction: this.coleccion[index].direction,
        description: this.coleccion[index].description,
        time: this.coleccion[index].time
        },this.name+'-ride',this.name)
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
      for (let index = 0; index < this.coleccion.length; index++) {
        this.driversListService.createDoc(this.coleccion[index],'driversList',this.coleccion[index].userName);
        
      }
      await this.driversListService.updateSeatsDriversList(this.coleccion);
    }
  }

}
