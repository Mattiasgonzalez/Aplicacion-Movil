import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { DriversListService } from 'src/app/services/drivers-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  name = ''; 
  driverList = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController,
    private loadingCtrl: LoadingController,
    private driversListService: DriversListService
  ) {
    this.loadData();
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        let usuario = this.router.getCurrentNavigation().extras.state.user;
        this.name = this.name.concat("Bienvenido ",usuario.name.toString());
      }
    })
   }
  ngOnInit() {
  }
  async loadData(){
    await this.driversListService.init();
    this.driverList = await this.driversListService.getData();
    console.log(this.driverList);
  }
}