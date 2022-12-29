import { Component, OnInit } from '@angular/core';
import { QuotableService } from 'src/app/services/api/quotable/quotable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private quotableService: QuotableService) {}
  
  ngOnInit() {
    this.quotableService.getRandomQuote().subscribe((res) => {
      console.log(res);
    })
    
    this.quotableService.getColor().subscribe((res) => {
      console.log(res);
    })
  }
}
