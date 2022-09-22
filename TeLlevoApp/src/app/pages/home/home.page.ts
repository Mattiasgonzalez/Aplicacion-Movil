import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  name: '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController,
    private loadingCtrl: LoadingController,
  ) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        let usuario = this.router.getCurrentNavigation().extras.state.user;
        this.name = usuario.name;
      }
    })
   }

  ngOnInit() {
  }

}
