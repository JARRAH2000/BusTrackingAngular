import { Component } from '@angular/core';
import { ContentService } from 'src/app/service/content.service';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public contentService: ContentService) {}
  mail: any = ''
  phone: any = ''
  async ngOnInit() {
    await  this.contentService.GetAllContent()
    this.mail = this.contentService.content[0].email
    this.phone = this.contentService.content[0].telephone
  }

  /* RouteTo(link:any){
    this.router.navigate([])
  } */
}
