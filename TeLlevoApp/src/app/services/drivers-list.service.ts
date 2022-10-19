import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'driversList';

@Injectable({
  providedIn: 'root'
})
export class DriversListService {

  driverList=[]; 

  constructor(private storage: Storage) {
    this.init();
   }

  async init(){
    await this.storage.create();
  }


  /* ---------- DRIVERS LIST ---------- */
  
  getDataDriversList(){
    return this.storage.get(STORAGE_KEY) ||  [];
  }

  async addDataToDriversList(item){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  // Guardamos la base de datos de los viajes en storedData, luego borramos la base de datos de los viajes y guardamos la nueva con el elemento eliminado.
  async removeItemDriversList(index){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index,1);
    this.storage.remove(STORAGE_KEY);
    this.storage.set(STORAGE_KEY, storedData);
  }

  async updateSeatsDriversList(item){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    this.storage.remove(STORAGE_KEY);
    this.storage.set(STORAGE_KEY, item);
  }


  /* ---------- USER AS DRIVER ---------- */

  async getUserDrive(name){
    return await this.storage.get(name+"-drive");
  }

  async createUserDriver(name, item){
    await this.storage.set(name+"-drive", item);
    await this.storage.set(name+"-drive-passangers",[]);
  }

  async removeUserDriver(name){
    await this.storage.remove(name+"-drive");
    await this.removeUserDrivePassangers(name);
  }

  async addUserDrivePassangers(driversName,passangersName){
    const storedData = await this.storage.get(driversName+"-drive-passangers");
    storedData.push(passangersName);
    await this.storage.set(driversName+"-drive-passangers", storedData);
  }

  async getUserDrivePassangers(name){
    return this.storage.get(name+"-drive-passangers");
  }

  async removeUserDrivePassangers(name){
    await this.storage.remove(name+"-drive-passangers");
  }

  /* ---------- USER AS RIDER ---------- */

  async getUserRide(name){
    return await this.storage.get(name+"-ride");
  }

  async updateUserRide(name, item){
    await this.storage.set(name+"-ride", item);
  }

}
