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
  driverList2 = [];
  driversPassangers=[];
  driversPassangersAsRider=[];
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
    
  }
  
  async rideH(){
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
    await this.rideH();
    this.driversPassangers = await this.driversListService.getUserDrivePassangers(this.name);
    console.log(this.auxRide);
    await this.dpar()
    this.driverList2 = await this.driversListService.getDataDriversList();
    console.log(this.driversPassangersAsRider)
  }
  async dpar(){
    if(this.auxRide ==true){
      console.log("dentro dpar")
      this.driversPassangersAsRider = await this.driversListService.getUserDrivePassangers(this.ride.driversUserName);
    }
    
  }

async clickFinishDrive(){
  for (let index = 0; index < this.driverList.length; index++) {
    if(this.driverList[index].available == true && this.driverList[index].userName == this.name){
      this.driverList[index].available = false;
      await this.driversListService.updateSeatsDriversList(this.driverList);
    }
  }
  await this.cfd1();
  await this.driversListService.removeUserDriver(this.name);
  await this.driversListService.removeUserDrivePassangers(this.name);
  window.location.reload();
}

async cfd1(){
  for (let index = 0; index < this.driversPassangers.length; index++) {
   await this.driversListService.removeUserRide(this.driversPassangers[index].userName)
  }
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

  async finalizarpasajero(){
    await this.p1();
    await this.p2();
    await this.cancelarpasajero();
    window.location.reload();
  }

  //pasajeros lista
  async p1(){
    for (let index = 0; index < this.driversPassangersAsRider.length; index++) {
      console.log(this.driversPassangersAsRider[index])
      if(this.driversPassangersAsRider[index].userName == this.name){
        console.log("p1p1p1")
        await this.driversListService.removeUserDrivePassangers2(this.ride.driversUserName, index)
      }
    }
  }

  //Asientos
  async p2(){
    for (let index = 0; index < this.driverList2.length; index++) {
      if(this.driverList2[index].userName == this.ride.driversUserName && this.driverList2[index].available == true){
        this.driverList2[index].seatsAvailable = this.driverList2[index].seatsAvailable + 1;
        await this.driversListService.updateSeatsDriversList(this.driverList2); 
      }
  }}

  async cancelarpasajero(){
    await this.driversListService.removeUserRide(this.name);
  }
}