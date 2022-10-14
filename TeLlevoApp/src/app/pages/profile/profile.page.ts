import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  user : User = {
    name: '',
    lastName: '',
    userName: '',
    password: '',
    rut: '',
    number: ''
  }
  name = '';
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private AlertController: AlertController,
    private storage: Storage,
    public formBuilder: FormBuilder,
    private router: Router

  ) { }

  async presentAlert() {
    const alert = await this.AlertController.create({
      header: 'Datos modificados con exito',
      subHeader: 'Tenga un buen viaje',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
    })
    this.getUserData()
  }

  async getUserData(){
    this.name = await this.storage.get('session');
    this.user = await this.storage.get(this.name);
  }

  get errorControl() { return this.ionicForm.controls; }

  onSubmit(){
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.modifyAccount();
    }
  }

  async modifyAccount() {
      await this.storage.set(this.ionicForm.get('userName').value, this.ionicForm.value);
      window.location.reload();
  }

}
