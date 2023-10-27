import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/service/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public contentService:ContentService,private spinner:NgxSpinnerService){}

  async ngAfterViewInit(){
    this.spinner.show()
    await this.contentService.GetAllContent()
    this.spinner.hide()
  }
}
