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
  auxDrive2 = false;
  driverList = [];
  driverList2 = [];
  driversPassangers;
  driversPassangersAsRider = [];
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
  }

  async rideH() {
    if (this.ride == undefined) {
      this.auxRide = false;
    } else {
      this.auxRide = true;
    }
  }

  async sessionName() {
    this.name = await this.storage.get('session');

    this.driversListService.readCol('driversList').subscribe(res => {
      this.driverList = res;
      this.driverList2 = this.driverList;
    });
    this.driversListService.readDoc(this.name + '-drive', this.name).subscribe(res => {
      this.drive = res;
      let aux;
      aux = res;
      if (aux.available == true) {
        this.auxDrive = true;
      }else{
        this.auxDrive = false
      }

    })
    this.driversListService.readDoc(this.name + '-ride', this.name).subscribe(res => {
      let aux;
      aux = res;
      this.ride = aux;
      console.log('dentro de sub -ride')
      console.log(this.ride);
      if(this.ride == undefined){
        this.auxRide = false
      }else{
        this.auxRide = true;
      }
    })

    this.driversListService.readCol(this.name + '-drive-passangers').subscribe(res => {
      let aux;
      aux = res;
      this.driversPassangers = aux;
      let bol = true
      console.log(this.driversPassangers.length)
      
      if(this.driversPassangers.length > 1) {
        this.auxDrive2 = true;
      }else{
        this.auxDrive2 =false;
      }

    })

  }

  async clickFinishDrive() {
    for (let index = 0; index < this.driverList.length; index++) {
      if (this.driverList[index].available == true && this.driverList[index].userName == this.name) {
        this.driverList[index].available = false;
        this.driversListService.createDoc(this.driverList[index], 'driversList', this.name)
      }
    }
    await this.cfd1();
    this.driversListService.deleteDoc(this.name + '-drive', this.name);
    for (let index = 0; index < this.driversPassangers.length; index++) {
      this.driversListService.deleteDoc(this.name + '-drive-passangers', this.driversPassangers[index].userName)
    }
    this.driversListService.deleteDoc(this.name + '-drive-passangers', 'test');
    this.router.navigate(['/payment'], { replaceUrl: true });
  }

  async cfd1() {
    for (let index = 0; index < this.driversPassangers.length; index++) {
      this.driversListService.deleteDoc(this.driversPassangers[index].userName + '-ride', this.driversPassangers[index].userName)
    }
  }


  // ---------- LINK A VISTA DRIVE ----------

  clickToDrive() {
    if (this.auxDrive == true) {
      this.cannotDriveDriving();
    } else {
      if (this.auxRide == true) {
        this.cannotDriveRiding();
      } else {
        this.router.navigate(['/drive'], { replaceUrl: true });
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

  async cannotRideRiding() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ya tienes un viaje pedido',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cannotRideDriving() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No puedes pedir un viaje mientras tengas un viaje activo como chofer',
      buttons: ['OK'],
    });
    await alert.present();
  }

  routerToPasajero() {
    if (this.auxDrive == true) {
      this.cannotRideDriving();
    } else {
      if (this.auxRide == true) {
        this.cannotRideRiding();
      } else {
        this.router.navigate(['/ride'], { replaceUrl: true });
      }
    }

  }

  async finalizarpasajero() {
    await this.p1();
    this.driversListService.deleteDoc(this.ride.driversUserName + '-drive-passangers', this.name)
    await this.p2();
    await this.cancelarpasajero();
    this.auxRide = false;
    this.router.navigate(['/payment'], { replaceUrl: true });
  }

  //pasajeros lista
  async p1() {
    this.driversListService.deleteDoc(this.ride.driversUserName + '-drive-passangers', this.name)
  }

  //Asientos
  async p2() {
    for (let index = 0; index < this.driverList2.length; index++) {
      if (this.driverList2[index].userName == this.ride.driversUserName && this.driverList2[index].available == true) {
        this.driverList2[index].seatsAvailable = this.driverList2[index].seatsAvailable + 1;
        this.driversListService.createDoc(this.driverList2[index], 'driversList', this.ride.driversUserName)
      }
    }
  }

  async cancelarpasajero() {
    this.driversListService.deleteDoc(this.name + '-ride', this.name);
  }
}