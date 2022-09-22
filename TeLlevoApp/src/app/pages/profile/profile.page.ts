import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private AlertController: AlertController) {}

  async presentAlert() {
    const alert = await this.AlertController.create({
      header: 'Datos modificados con exito',
      subHeader: 'Tenga un buen viaje',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }
}
