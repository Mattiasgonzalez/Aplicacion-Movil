import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
    users;
    user = {
      name: '',
      lastName: '',
      userName: '',
      password: '',
      rut: '',
      number: '',
      pregunta: '',
      respuesta: ''
    }
    userValidationHtml = false;
    userQuestion;
    userValidation;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private MenuController: MenuController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.users = await this.storage.get('users');
  }

  ionViewWillEnter() {
    this.MenuController.enable(false);
  }

  ionViewDidLeave() {
    this.MenuController.enable(true);
  }

  async onSubmit() {

    

    if (this.userValidation != undefined) {
      if (this.user.userName == this.userValidation.userName && this.user.respuesta == this.userValidation.respuesta) {
        this.storage.set('session', this.user.userName);
        this.showLoading();
        setTimeout(() => {
          this.router.navigate(['/profile'], { replaceUrl: true });
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
      message: 'Usuario o Respuesta incorrecto(s)',
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

  validar(){
    this.userValidation;
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].userName == this.user.userName){
        this.userValidation = this.users[index];
        this.userQuestion = this.users[index].pregunta;
        this.userValidationHtml = true;
      } 
      
    }
  }

  volver(){
    this.router.navigate(['/login'],{replaceUrl:true})
  }
}
