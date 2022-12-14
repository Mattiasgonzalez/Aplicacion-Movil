import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
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
    private storage: Storage,
    private platform: Platform
  ) {
    this.getUsers();
    this.name();
    this.loadData();
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/home'])
    });
  }
  checker1: boolean = true;
  checker2: boolean = true;

  /* ---------- VARIABLES ---------- */

  users;
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
    price: null,
    seats: null,
    seatsAvailable: 0,
    available: true,
    time: '',
    description: ''
  }

  driverList = [];


  /* ---------- FUNCIONES ---------- */

  // Alerta

  async getUsers() {
    this.users = await this.driversListService.getAllUsers();
  }
  
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
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].userName == this.list.userName){
        this.user = this.users[index];
      }
    }
    this.list.name = this.user.name;
  }
  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Viaje Invalido',
      subHeader: 'Realizelo de nuevo',
      buttons: ['OK']});await alert.present();}
  
      async loadData() {this.driverList = await this.driversListService.getDataDriversList();}

  async addData() {
    if (this.list.seats>0 && this.list.price>0){
      this.list.seatsAvailable = this.list.seats
      await this.driversListService.addDataToDriversList(this.list);
      this.driversListService.createDoc(this.list,'driversList',this.list.userName);
      this.createUserDriver();
      this.loadData();
      this.presentAlert();
      this.router.navigate(['/home']);
    }
    else {
      this.presentAlertError();


    }
  }

  async createUserDriver(){
    await this.driversListService.createUserDriver(this.list.userName, this.list);
    await this.driversListService.createDoc(this.list,this.list.userName+ '-drive',this.list.userName);
    await this.driversListService.createDoc({test:'test'},this.list.userName+ '-drive-passangers','test');
    
  }

  onSubmit() {
    
    this.addData();
    
  }

isNumberKey(evt)
{
     var charCode = (evt.which) ? evt.which : evt.keyCode;
     if (charCode < 48 || charCode > 57)
             return false;
     return true;
}

gotChar(eve) {
  this.checker1 = eve.target.value === '0' ? true : false ;
}

gotChar2(eve) {
  this.checker2 = eve.target.value === '0' ? true : false ;
}


gotChange1(eve) {
  console.log(eve.target.value);
  this.checker1 = eve.target.value === '0' ? true : false;
 }

 gotChange2(eve) {
  console.log(eve.target.value);
  this.checker2 = eve.target.value === '0' ? true : false;
 }
}






