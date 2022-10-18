import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user = {
        name: '',
        lastName: '',
        userName: '',
        password: '',
        rut: '',
        number: '',
        pregunta: '',
    }

    constructor(
        private alertController: AlertController,
        private router: Router,
        private loadingCtrl: LoadingController,
        private MenuController: MenuController,
        private storage: Storage
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.MenuController.enable(false);
    }

    ionViewDidLeave() {
        this.MenuController.enable(true);
    }

    async onSubmit() {
        let userValidation = await this.storage.get(this.user.userName);
        if (userValidation!=null){
            if (this.user.userName == userValidation.userName && this.user.password == userValidation.password) {
                this.storage.set('session', this.user.userName);
                this.showLoading();
                setTimeout(() => {
                    this.router.navigate(['/home']);
                }, 1000);
            }
        }
        else {
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

    async showLoading() {
        const loading = await this.loadingCtrl.create({
            message: 'Autenticando...',
            duration: 1000,
        });
        await loading.present();
    }
}
