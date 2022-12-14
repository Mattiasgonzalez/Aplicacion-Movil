import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Pago Realizado',
      subHeader: 'Tenga un buen viaje',
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}

