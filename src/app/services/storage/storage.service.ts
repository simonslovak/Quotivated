import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage    
  ) {}

  saveData(data: any) {
    this.storage.set('myData', JSON.stringify(data));
  }

  async loadData(): Promise<any> {    
    const data = await this.storage.get('myData');
    //await this.storage.clear();
    return JSON.parse(data);
  }

}
