import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuController: MenuController
  ) {
    this.activatedRoute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        let usuario = this.router.getCurrentNavigation().extras.state.user;
      }
    })
   }

  ngOnInit() {
  }

}
