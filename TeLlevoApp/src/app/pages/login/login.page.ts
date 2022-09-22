import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userRegister = {
        name: 'a',
        lastName: 'b',
        userName: 'asd',
        password: '123',
        rut: '1234567',
        number: '123456789'
    }

    user = {
        name: '',
        lastName: '',
        userName: '',
        password: '',
        rut: '',
        number: ''
    }

    constructor(
        private alertController: AlertController,
        private router: Router,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit() {
        
    }

    onSubmit() {
        if (this.user.userName == this.userRegister.userName && this.user.password == this.userRegister.password) {
            let navigationExtras: NavigationExtras = {
                state: {
                    user: this.userRegister,
                    aux: 'aux'
                }
            };
            this.showLoading();
            setTimeout(() => {
                this.router.navigate(['/home'], navigationExtras);
            },
                3000);
            
        } else {
            this.failedLogin();
        }
    }

    async failedLogin() {
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
            message: '',
            buttons: [
                {
                    text: 'Registrar', role: 'register', handler: (alertData) => {
                        if (alertData.name != '' && alertData.lastName != '' && alertData.userName != '' && alertData.password != '' && alertData.rut.toString().length >= 7 && alertData.number.toString().length >= 9) {
                            this.userRegister.name = alertData.name;
                                this.userRegister.lastName = alertData.lastName;
                                this.userRegister.userName = alertData.userName;
                                this.userRegister.password = alertData.password;
                                this.userRegister.rut = alertData.rut;
                                this.userRegister.number = alertData.number;
                                console.log('si');
                                return true;
                        } else {
                            alert.message = 'Error al ingresar un(os) dato(s)';
                            console.log('no');
                            return false;
                        }
                    }
                },
                { text: 'Cancelar', role: 'cancel' }
            ],
            inputs: [
                { type: 'text', name: 'name', placeholder: 'Nombre' },
                { type: 'text', name: 'lastname', placeholder: 'Apellido' },
                { type: 'text', name: 'userName', placeholder: 'Usuario (Correo duoc antes de @)' },
                { type: 'password', name: 'password', placeholder: 'Contraseña' },
                { type: 'number', name: 'rut', placeholder: 'Rut' },
                { type: 'number', name: 'number', placeholder: 'Telefono (Sin +56)' }
            ],
            backdropDismiss: false
        });
        await alert.present();
    }
    
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
      duration: 3000,
      
    });

    loading.present();
  }


}
