import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuotableService } from 'src/app/services/api/quotable/quotable.service';
import { ApiResult } from 'src/app/models/quotable.model';
import { ModalController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  
  quotes: ApiResult[] = [];   
  currentPage = 1;  


  step = 5;
  rangeValues = [25, 75];
  updateValues(event: any) {
    if(!isNaN(event.value[0])) this.rangeValues[0] =  Math.round(event.value[0]/this.step)*this.step;
    if(!isNaN(event.value[1])) this.rangeValues[1] =  Math.round(event.value[1]/this.step)*this.step;
  } 
  
  constructor(
    private quotableService: QuotableService,
    private loadingCtrl: LoadingController,
    private modalFilters: ModalController    
    ) {}

    ngOnInit() {
    }

  async loadQuote() {
    
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles'
    });
    await loading.present();

    this.quotableService.getSpecificQuotes(this.currentPage, "war", "tags").subscribe((res) => {
      loading.dismiss();
      this.quotes = [...res.results];              
      console.log(this.quotes)          
  });

  }
  clickModal() {
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalFilters.create({
      component: FiltersPage,
    });

    await modal.present();
  }
}
