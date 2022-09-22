import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-drive',
  templateUrl: './drive.page.html',
  styleUrls: ['./drive.page.scss'],
})
export class DrivePage implements OnInit {

  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje programado con exito',
      subHeader: 'Tenga un buen viaje',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

}
