import { Component, OnInit } from '@angular/core';
import { ApiResult } from 'src/app/models/quotable.model';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  results?: ApiResult;  
  quotesList: ApiResult[] = []

  constructor(
    private storageService: StorageService 
  ) {}

  async ionViewWillEnter(){
    this.quotesList = await this.storageService.loadData();
  }

  async ngOnInit() {
    this.quotesList = await this.storageService.loadData() 
    console.log(this.quotesList);   
  }

  async removeFromFavorites() {
    let existingItem = this.quotesList.find(i => i._id == this.results?._id);   
    if(existingItem) {
      
    }
  }
}
