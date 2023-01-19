import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuotableService } from 'src/app/services/api/quotable/quotable.service';
import { ApiResult } from 'src/app/models/quotable.model';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   
  results?: ApiResult;  
  resultsList: ApiResult[] = [];
  wikiresult: any;
  currentPage = 1;

  constructor(
    private quotableService: QuotableService,       
    private loadingCtrl: LoadingController,
    private storageService: StorageService        
    ) {}
  
  ngOnInit() {
    this.quotableService.getRandomQuote(this.currentPage).subscribe((res) => {    
      this.results = res;            
      console.log(this.results)      
   });
}

  async loadQuote() {    
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles'
    });
    await loading.present();

    this.quotableService.getRandomQuote(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.results = res;    
  });
  }

  async addToFavorites() {
    this.resultsList = await this.storageService.loadData();
    if(this.resultsList == null){
      this.resultsList = [];
    }
    if(this.results !== undefined) {      
      let existingItem = this.resultsList.find(i => i._id === this.results?._id);
      if(!existingItem) {
        this.resultsList.push(this.results);
        this.storageService.saveData(this.resultsList);
      }
    } else {
      this.resultsList = [];
    }
  }
};
