import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DriversListService } from 'src/app/services/drivers-list.service';
@Component({
  selector: 'app-drive',
  templateUrl: './drive.page.html',
  styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {

  constructor(
    private alertController: AlertController,
    private driversListService: DriversListService,
    private router: Router,
    private storage: Storage
  ) {
    this.name();
    this.loadData();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje programado con exito',
      subHeader: 'Tenga un buen viaje',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async name(){
    this.list.name = await this.storage.get('session');
  }

  list = {
    name: '',
    direction: '',
    price: '',
    seats: 0,
    available: true
  }

  driverList = [];

  async loadData() {
    this.driverList = await this.driversListService.getData();
  }

  async addData() {
    await this.driversListService.addData(this.list);
    this.loadData();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.presentAlert();
    this.addData();
    this.router.navigate(['/home']);
  }

}
