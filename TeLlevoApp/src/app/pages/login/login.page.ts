import { DriversListService } from 'src/app/services/drivers-list.service';
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

    users;

    constructor(
        private alertController: AlertController,
        private router: Router,
        private loadingCtrl: LoadingController,
        private MenuController: MenuController,
        private storage: Storage,
        private driversListService: DriversListService,
    ) { }

    async ngOnInit() {
        await this.storage.set('session', null);
        this.users = this.driversListService.readCol('users').subscribe(res => {
            console.log(res); 
            this.users = res; 
            this.storage.set('users',this.users);
        });

    }

    ionViewWillEnter() {
        this.MenuController.enable(false);
    }

    ionViewDidLeave() {
        this.MenuController.enable(true);
    }

    fpassword(){
        this.router.navigate(['/forgotpassword'], {replaceUrl: true});
      }

    async onSubmit() {
        let failed = true;
        for (let index = 0; index < this.users.length; index++) {
            if (this.users[index].userName == this.user.userName) {
                if (this.users[index].password == this.user.password){
                    this.storage.set('session', this.user.userName);
                    this.showLoading();
                    setTimeout(() => {
                        this.router.navigate(['/home']);
                    }, 1000);
                    failed = false;
                }
            }
        }
        if(failed){this.failedLogin();}
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
