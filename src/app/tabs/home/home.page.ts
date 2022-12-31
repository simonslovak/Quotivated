import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { QuotableService } from 'src/app/services/api/quotable/quotable.service';
import { WikipediaService } from 'src/app/services/api/wikipedia/wikipedia.service';
import { XcolorsService } from 'src/app/services/api/xcolors/xcolors.service';
import { ApiResult } from 'src/app/models/quotable.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   
  results?: ApiResult;
  currentPage = 1;

  constructor(
    private quotableService: QuotableService,
    private wikipedia: WikipediaService,
    private xcolorsService: XcolorsService,
    private loadingCtrl: LoadingController    
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
      console.log(this.results)      
  });

    // this.wikipedia.getAuthorInfo().subscribe((res) => {
    //   console.log(res);
    // })

    // this.xcolorsService.getRandomColour().subscribe((res) => {
    //   console.log(res);
    // })
  }
};
