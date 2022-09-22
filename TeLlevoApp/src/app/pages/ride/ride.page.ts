import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  constructor() { }

  coleccion:any=[];
  avatar=
  {
    imagen:'/assets/img/conductor.png',
    nombre:'Ricardo',
    direccion:'Dirección: Concepción',
    precio:'$3000'
  }

  name = 'Pasajero';

  ngOnInit() {
  }
  
  doRefresh(evento){
    console.log("Refrescando la página");
    console.log(evento);

    setTimeout(() => {
      evento.target.complete();
      
      for (let index = 0; index < 30; index++) {
        this.coleccion[index]=this.avatar;
        
      }


    }, 2000);
  }

}
