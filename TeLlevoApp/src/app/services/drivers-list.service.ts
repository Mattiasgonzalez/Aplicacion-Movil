import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'driversList';

@Injectable({
  providedIn: 'root'
})
export class DriversListService {

  constructor(private storage: Storage) {
    this.init();
   }

  async init(){
    await this.storage.create();
  }

  getData(){
    return this.storage.get(STORAGE_KEY) ||  [];
  }

  async addData(item){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(index){
    const storedData = await this.storage.get(STORAGE_KEY[index]) || [];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY, storedData);
  }

}
