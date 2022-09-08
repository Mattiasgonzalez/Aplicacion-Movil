import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userRegister = {
    username: '',
    password: ''
  }

  user = {
    username: '',
    password: ''
  }

  constructor( 
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.user.username == this.userRegister.username && this.user.password == this.userRegister.password){
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.userRegister,
          aux: 'aux'
        }
      };
      this.router.navigate(['/home'], navigationExtras);
    } else {
      this.failedLogin();
    }
  }
 
  async failedLogin(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrecto(s)',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async register() {
    const alert = await this.alertController.create({
      header: 'Ingrese sus datos',
      buttons: [
        {text: 'Registrar', role: 'register', handler: (alertData) => {
          this.userRegister.username = alertData.username, 
          this.userRegister.password = alertData.password
        }},
        {text: 'Cancelar', role: 'cancel'}
      ],
      inputs:[
        {type: 'text', name: 'username', placeholder: 'Usuario'},
        {type: 'password', name: 'password', placeholder: 'Contraseña'}
      ],
      backdropDismiss:false
    });
    await alert.present();
  }


}
