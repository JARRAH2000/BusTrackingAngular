import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/service/content.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  constructor(public contentService: ContentService) { }


  contentForm = new FormGroup({
    id: new FormControl(this.contentService.content[0].id, [Validators.required]),
    about: new FormControl(this.contentService.content[0].about, [Validators.maxLength(500)]),
    email: new FormControl(this.contentService.content[0].email, [Validators.email, Validators.maxLength(256)]),
    facebook: new FormControl(this.contentService.content[0].facebook, [Validators.maxLength(256)]),
    youtube: new FormControl(this.contentService.content[0].youtube, [Validators.maxLength(256)]),
    telephone: new FormControl(this.contentService.content[0].telephone, [Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]),
    greeting: new FormControl(this.contentService.content[0].greeting, [Validators.maxLength(256)]),
    paragraph: new FormControl(this.contentService.content[0].paragraph, [Validators.maxLength(500)]),
    mainlogo: new FormControl(this.contentService.content[0].mainlogo),
    latitude:new FormControl(this.contentService.content[0].latitude,[Validators.required,Validators.maxLength(50)]),
    longitude:new FormControl(this.contentService.content[0].longitude,[Validators.required,Validators.maxLength(50)])
  })


  async ngOnInit() {
    await this.contentService.GetAllContent()
  }


  async UpdateContent() {
    console.log(this.contentForm.value)

    await this.contentService.UpdateContent(this.contentForm.value)
    await this.contentService.GetAllContent()
    console.log(this.contentForm.value)
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.contentService.uploadAttachmentImage(formData);
  }

  
}
