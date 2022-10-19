import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/interfaces/user';
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


  /* ---------- VARIABLES ---------- */

  user : User = {
    name: '',
    lastName: '',
    userName: '',
    password: '',
    rut: '',
    number: '',
    pregunta: '',
  }

  list = {
    userName: '',
    name: '',
    direction: '',
    price: '',
    seats: 0,
    seatsAvailable: 0,
    available: true
  }

  driverList = [];


  /* ---------- FUNCIONES ---------- */

  // Alerta
  
  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje programado con exito',
      subHeader: 'Tenga un buen viaje',
      buttons: ['OK']});await alert.present();}

  // llamamos a los nombres de session y llenamos una lista
  async name(){
    this.list.userName = await this.storage.get('session');
    this.user = await this.storage.get(this.list.userName);
    this.list.name = this.user.name;
  }

  async loadData() {this.driverList = await this.driversListService.getDataDriversList();}

  async addData() {
    this.list.seatsAvailable = this.list.seats
    await this.driversListService.addDataToDriversList(this.list);
    this.createUserDriver();
    this.loadData();
  }

  async createUserDriver(){
    //let aux = await this.driversListService.getUserDrive(this.list.userName);
    await this.driversListService.createUserDriver(this.list.name, this.list);
    
  }

  onSubmit() {
    this.presentAlert();
    this.addData();
    this.router.navigate(['/home']);
  }

}
