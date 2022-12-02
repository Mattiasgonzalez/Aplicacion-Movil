import { DriversListService } from 'src/app/services/drivers-list.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Variables
  ionicForm: FormGroup;
  isSubmitted = false;
  users;

  constructor(
    private storage: Storage,
    private router: Router,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    private LoadingController: LoadingController,
    private menuController: MenuController,
    private driversListService: DriversListService
  ) { }

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('[0-9]*')]],
      number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]],
      pregunta: ['', [Validators.required, Validators.maxLength(20)]],
    })
    await this.getUsers();
  }

  async getUsers() {
    this.users = await this.driversListService.getAllUsers();
  }

  ionViewWillEnter() { this.menuController.enable(false); }
  ionViewDidLeave() { this.menuController.enable(true); }

  // Controlador de errores para Form
  get errorControl() { return this.ionicForm.controls; }

  // Si la forma es valida llamamos a la funcion que crea la cuenta
  onSubmit() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.createAccount();
    }
  }
  accAlreadyExists = 'xd';
  // Creamos la cuenta si esque esta no existe
  createAccount() {
    let canCreate = true;
    console.log(this.users[0].userName);
    for (let index = 0; index < this.users.length; index++) {
      if (this.ionicForm.get('userName').value == this.users[index].userName) {
        canCreate = false;
      }
    }
    if (canCreate) {
      this.driversListService.readDoc(this.ionicForm.get('userName').value, 'users').subscribe(respuesta => {
        if (true) {
          this.driversListService.createDoc(this.ionicForm.value, 'users', this.ionicForm.get('userName').value)
          this.showLoading();
          setTimeout(() => {
            this.router.navigate(['/login'], {replaceUrl: true});
          },
            1100);
        };
      })
    }else{
      this.failedRegister();
    }
  }

  async failedRegister() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Este usuario ya existe',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showLoading() {
    const loading = await this.LoadingController.create({
      message: 'Registrando...',
      duration: 1000,
    });
    await loading.present();
  }

}
