import { Component, OnInit } from '@angular/core';
import { ApiResult } from 'src/app/models/quotable.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  results?: ApiResult;  
  quotesList: ApiResult[] = []

  constructor(
    private storageService: StorageService,
    private alertYesNo: AlertController 
  ) {}

  async ionViewWillEnter(){
    this.quotesList = await this.storageService.loadData();    
    this.quotesList.reverse();
  }

  async ngOnInit() {
    this.quotesList = await this.storageService.loadData() 
    console.log(this.quotesList.reverse());   
  }

  async alertFunc() {
    return new Promise(async (resolve, reject) => {
        const alert = await this.alertYesNo.create({
            header: 'Confirm!',
            message: 'Are you sure you want delete this quote?',
            buttons: [
                {
                    text: 'Yes',
                    cssClass: 'secondary',               
                    handler: () => {                  
                        resolve('Yes');
                    }
                }, {
                    text: 'No',   
                    role: 'cancel',                   
                    handler: () => {                           
                        resolve('No');
                    }
                }
            ]
        });
        await alert.present();
    });
}

  async removeFromFavorites(item: ApiResult) {
    let answer = await this.alertFunc();
    
    if(answer == "Yes") {
      let index = -1;    
      console.log(item);
      this.quotesList = await this.storageService.loadData(); 
      console.log(this.quotesList);
      if(this.quotesList == null) {
        this.quotesList = [];
        index = -1;
      } else {
        for(let i = 0; i < this.quotesList.length; i++) {
          if(this.quotesList[i]._id == item._id) {
            index = i;
            break;
          } else {
            index = -1;
          }
        }      
      }
      console.log(index);
    
      if(index != -1){
        this.quotesList.splice(index,1);
        console.log(index);
        
        console.log(this.quotesList);      
        await this.storageService.saveData(this.quotesList);      
        this.quotesList = await this.storageService.loadData();
        if(this.quotesList == null) {
          this.quotesList = [];
        }      
      }
    }
  }
}
