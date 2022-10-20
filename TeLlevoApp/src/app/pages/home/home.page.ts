import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';
import { DriversListService } from 'src/app/services/drivers-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  name = '';
  drive = {}
  auxDrive = false;
  driverList = [];
  driversPassangers=[];
  auxRide = false;
  ride = {
    driversUserName: '',
    driversName: '',
    direction: '',
    description: '',
    time: '',
    price: ''
  }

  constructor(
    private storage: Storage,
    private driversListService: DriversListService,
    private alertController: AlertController,
    private router: Router
  ) {
    
   }

  async ngOnInit() {
    await this.sessionName()  
    console.log("lol " +this.name + " " + this.drive)
    console.log(this.drive)
    if(this.drive!=null){
      this.auxDrive = true;
    }
    if(this.ride==null){
      this.auxRide = false;
    }else{
      this.auxRide = true;
    }
  }
  

  async sessionName() {
    this.name = await this.storage.get('session');
    this.driverList = await this.driversListService.getDataDriversList();
    this.drive = await this.driversListService.getUserDrive(this.name);
    this.ride = await this.driversListService.getUserRide(this.name);
    this.driversPassangers = await this.driversListService.getUserDrivePassangers(this.name);
  }

async clickFinishDrive(){
  for (let index = 0; index < this.driverList.length; index++) {
    if(this.driverList[index].available == true && this.driverList[index].userName == this.name){
      this.driverList[index].available = false;
      await this.driversListService.updateSeatsDriversList(this.driverList);
    }
  }
  await this.driversListService.removeUserDriver(this.name);
  window.location.reload();
}


  /* ---------- LINK A VISTA DRIVE ----------*/
  
  clickToDrive(){
    if(this.drive!=null && this.ride==null){
      this.cannotDriveDriving();
    }else{
      if(this.drive==null && this.ride!=null){
        this.cannotDriveRiding();
      }else{
        this.router.navigate(['/drive'], {replaceUrl: true});
      }
    }
  }

  async cannotDriveDriving() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se pueden crear dos publicaciones simultaneas',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cannotDriveRiding() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No puedes publicar si ya eres pasajero',
      buttons: ['OK'],
    });
    await alert.present();
  }

  routerToPasajero(){
    this.router.navigate(['/ride'], {replaceUrl:true});
  }

  finalizarpasajero(){

  }

  cancelarpasajero(){

  }
  
}