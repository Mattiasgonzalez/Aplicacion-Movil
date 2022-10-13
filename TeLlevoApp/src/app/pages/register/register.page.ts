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

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private storage: Storage,
    private router: Router,
    private alertController: AlertController,
    public formBuilder: FormBuilder,
    private LoadingController: LoadingController,
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
    })

  }

  ionViewWillEnter() { this.menuController.enable(false); }
  ionViewDidLeave() { this.menuController.enable(true); }

  get errorControl() { return this.ionicForm.controls; }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.createAccount();
    }
  }

  async createAccount() {
    let accAlreadyExists = await this.storage.get(this.ionicForm.get('userName').value);
    if (accAlreadyExists == null) {
      await this.storage.set(this.ionicForm.get('userName').value, this.ionicForm.value);
      this.showLoading();
      setTimeout(() => {
        this.router.navigate(['/login']);
      },
        1100);
    } else { this.failedRegister() }
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
