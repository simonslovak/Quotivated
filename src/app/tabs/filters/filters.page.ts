import { Component, OnInit } from '@angular/core';
import { ApiResult } from 'src/app/models/quotable.model';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-filters',
  template: `<p>{{ minValue }} {{maxValue}}</p>`,
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
  
})

export class FiltersPage implements OnInit {
  
  inputValue: string = "";
  quotes: ApiResult[] = [];   
  currentPage = 1;     
  
  constructor(
    private sharedService: SharedService
  ) { }

    ngOnInit() {
    }  
    onChangeHandlerExpression(event: any) {
      console.log(event.detail.value);
      this.sharedService.setExpression(event.detail.value);
    }
    
    onChangeHandlerFields(event: any) {
      console.log(event.detail.value);
      if(event.detail.value == "author") {
        this.sharedService.setFields("author");                
      }
      else {
        this.sharedService.setFields("tags");
      }
    }

    onChangeHandlerMinMax(event: any) {
      console.log(event.detail.value);
      if(event.detail.value == "category1") {
        this.sharedService.setMinValue(0)
        this.sharedService.setMaxValue(1000);
      }
      else if(event.detail.value == "category2") {
        this.sharedService.setMinValue(0);
        this.sharedService.setMaxValue(49); 
      } else if (event.detail.value == "category3") {
        this.sharedService.setMinValue(50);
        this.sharedService.setMaxValue(99); 
      } else if (event.detail.value == "category4") {
        this.sharedService.setMinValue(100);
        this.sharedService.setMaxValue(149);
      } else {
        this.sharedService.setMinValue(150);
        this.sharedService.setMaxValue(1000);        
      } 
    }
    
}
