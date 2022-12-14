import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

AngularFireModule.initializeApp(environment.firebaseConfig);

const STORAGE_KEY = 'driversList';

@Injectable({
  providedIn: 'root'
})
export class DriversListService {

  driverList = [];

  constructor(private storage: Storage, private fire: AngularFirestore) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async getAllUsers() {
    return await this.storage.get('users')
  }

  /* ------------ FIREBASE ------------  */
  // Create Read Updare Delete 

  async createDoc(data: any, path: string, id: string) {
    const collection = await this.fire.collection(path);
    return await collection.doc(id).set(data);
  }

  readDoc(path: string, id: string) {
    const colelction = this.fire.collection(path);
    return colelction.doc(id).valueChanges();
  }

  readCol(path: string) {
    const collection = this.fire.collection(path);
    return collection.valueChanges();
  }

  async updateDoc(data: any, path: string, id: string) {
    const collection = await this.fire.collection(path);
    return await collection.doc(id).update(data);
  }

  async deleteDoc(path: string, id: string) {
    const collection = await this.fire.collection(path);
    return await collection.doc(id).delete();
  }

  /*async deleteCol(path: string) {
    let aux;
    let collection = this.fire.collection(path).valueChanges();
    collection.subscribe(res =>{
      aux = res;
      
    })
    for (let index = 0; index < aux.length; index++) {
      this.deleteDoc(path, aux[index].userName);
    }
    collection : 'lmao';

  }*/

  /* ---------- DRIVERS LIST ---------- */

  getDataDriversList() {
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addDataToDriversList(item) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  // Guardamos la base de datos de los viajes en storedData, luego borramos la base de datos de los viajes y guardamos la nueva con el elemento eliminado.
  async removeItemDriversList(index) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    this.storage.remove(STORAGE_KEY);
    this.storage.set(STORAGE_KEY, storedData);
  }

  async updateSeatsDriversList(item) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    this.storage.remove(STORAGE_KEY);
    this.storage.set(STORAGE_KEY, item);
  }


  /* ---------- USER AS DRIVER ---------- */

  async getUserDrive(name) {
    return await this.storage.get(name + "-drive");
  }

  async createUserDriver(name, item) {
    await this.storage.set(name + "-drive", item);
    await this.storage.set(name + "-drive-passangers", []);
  }

  async removeUserDriver(name) {
    await this.storage.remove(name + "-drive");
    await this.removeUserDrivePassangers(name);
  }

  async addUserDrivePassangers(driversName, passangersName) {
    const storedData = await this.storage.get(driversName + "-drive-passangers");
    storedData.push(passangersName);
    await this.storage.set(driversName + "-drive-passangers", storedData);
  }

  async getUserDrivePassangers(name) {
    return this.storage.get(name + "-drive-passangers");
  }

  async removeUserDrivePassangers(name) {
    await this.storage.remove(name + "-drive-passangers");
  }

  async removeUserDrivePassangers2(driversName, index) {
    const storedData = await this.storage.get(driversName + "-drive-passangers");
    storedData.splice(index, 1);
    this.storage.remove(driversName + "-drive-passangers");
    this.storage.set(driversName + "-drive-passangers", storedData);
  }

  /* ---------- USER AS RIDER ---------- */

  async getUserRide(name) {
    return await this.storage.get(name + "-ride");
  }

  async updateUserRide(name, item) {
    await this.storage.set(name + "-ride", item);
  }

  async removeUserRide(name) {
    await this.storage.remove(name + "-ride");
  }

}
