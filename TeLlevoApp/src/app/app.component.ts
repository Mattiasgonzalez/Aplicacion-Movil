import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage:Storage,
    private router: Router
    ) {}
  
  async ngOnInit() {
    await this.storage.create();
  }

  onClick(){
    console.log("cerramos sesion")
    this.storage.set('session', null)
    this.router.navigate(['/login']);
  }
}
