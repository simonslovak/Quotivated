import { Component, ViewEncapsulation, Injectable, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuotableService } from 'src/app/services/api/quotable/quotable.service';
import { ApiResult } from 'src/app/models/quotable.model';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SharedService } from 'src/app/services/shared/shared.service';

export interface isfavorite {
  result: ApiResult;
  fav: boolean;
}

@Component({
  selector: 'app-home',
  template: `<p>{{ minValue }} {{maxValue}}</p>`,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None 
})
@Injectable()
export class HomePage implements OnInit {
   
  results?: ApiResult;  
  resultsList: ApiResult[] = [];
  isfav?: isfavorite; 
  currentPage = 1;

  // shared variables
  expression: string;
  field: string;  
  minValue: number; 
  maxValue: number; 

  constructor(
    private quotableService: QuotableService,       
    private loadingCtrl: LoadingController,
    private storageService: StorageService,
    private sharedService: SharedService        
    ) {
      this.expression = this.sharedService.getExpression(),
      this.field = this.sharedService.getFields(),
      this.minValue = this.sharedService.getMinValue(),
      this.maxValue = this.sharedService.getMaxValue()
    }

  ngOnInit() {
    this.ionViewWillEnter();
    this.quotableService.getRandomQuote(this.currentPage, this.sharedService.getMinValue(), this.sharedService.getMaxValue()).subscribe((res) => {    
      this.results = res;            
      console.log(this.results)      
   });
}

async ionViewWillEnter(){
  this.resultsList = await this.storageService.loadData();
  if(typeof this.results !== "undefined"){
    for(let i=0; i<this.resultsList.length; i++){
      if(this.resultsList[i]._id == this.results._id){
        this.isfav = { result: this.results, fav: true };
        break;
      }
      else{
        this.isfav = { result: this.results, fav: false };
      }
    }
  }
}

  async loadQuote() {    
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles'
    });
    await loading.present();
    this.resultsList = await this.storageService.loadData();
    if(this.sharedService.getExpression() == "") {
      this.quotableService.getRandomQuote(this.currentPage, this.sharedService.getMinValue(), this.sharedService.getMaxValue()).subscribe((res) => {
      loading.dismiss();
      for(let i=0; i<this.resultsList.length; i++){
        if(this.resultsList[i]._id == res._id){
          this.isfav = { result: res, fav: true };
          this.results = res;
          break;
        }
        else{
          this.isfav = { result: res, fav: false };
          this.results = res;
        }
      }
      //this.results = res;    
    });} else {
      this.quotableService.getRandomFilteredQuote(this.currentPage, this.sharedService.getExpression(), this.sharedService.getFields(), this.sharedService.getMinValue(), this.sharedService.getMaxValue()).subscribe((res) => {
        loading.dismiss();
        for(let i=0; i<this.resultsList.length; i++){
          if(this.resultsList[i]._id == res._id){
            this.isfav = { result: res, fav: true };
            this.results = res;
            break;
          }
          else{
            this.isfav = { result: res, fav: false };
            this.results = res;
          }
        }
    });}
  }

  async addToFavorites() {
    this.resultsList = await this.storageService.loadData();
    if(this.resultsList == null){
      this.resultsList = [];
    }
      let index = -1;

      if(typeof this.results !== "undefined"){
        for(let i = 0; i < this.resultsList.length; i++) {
          if(this.resultsList[i]._id == this.results._id) {
            index = i;
            break;
          } else {
            index = -1;
          }
        }
      }
    
    if(this.results !== undefined) {      
      let existingItem = this.resultsList.find(i => i._id === this.results?._id);
      if(!existingItem) {
        this.resultsList.push(this.results);
        this.storageService.saveData(this.resultsList);
      }else{
        this.resultsList.splice(index,1);      
        await this.storageService.saveData(this.resultsList);      
        this.resultsList = await this.storageService.loadData();
      }
    } else {   
      this.resultsList = [];
    }
    
    if(typeof this.results !== "undefined"){
      for(let i=0; i<this.resultsList.length; i++){
        if(this.resultsList[i]._id == this.results._id){
          this.isfav = { result: this.results, fav: true };
          break;
        }
        else{
          this.isfav = { result: this.results, fav: false };
        }
      }
    }
  } 
};
