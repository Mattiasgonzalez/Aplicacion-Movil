import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { DriversListService } from '../../services/drivers-list.service';

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
    number: '',
    pregunta: '',
  }
  users;
  name = '';
  nrSelect;
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private AlertController: AlertController,
    private storage: Storage,
    public formBuilder: FormBuilder,
    private router: Router,
    private driversListService: DriversListService

  ) { }

  async presentAlert() {
    const alert = await this.AlertController.create({
      header: 'Datos modificados con exito',
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
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9), Validators.pattern('[0-9]*')]],
      number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]*')]],
      respuesta: ['', [Validators.required, Validators.maxLength(20)]],
      pregunta: ['', [Validators.required]]
    })
    this.getUserData()
  }

  async getUserData(){
    this.name = await this.storage.get('session');
    this.users = await this.storage.get('users');
    for (let index = 0; index < this.users.length; index++) {
      if(this.users[index].userName == this.name){
        this.user = this.users[index]
        console.log(this.user.pregunta)
        this.nrSelect = this.user.pregunta;
      }
    }
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
      this.driversListService.readDoc(this.ionicForm.get('userName').value, 'users').subscribe(respuesta => {
          this.driversListService.createDoc(this.ionicForm.value, 'users', this.ionicForm.get('userName').value)
          this.presentAlert();
          this.router.navigate(['/home'], {replaceUrl: true});
      })
  }

}
