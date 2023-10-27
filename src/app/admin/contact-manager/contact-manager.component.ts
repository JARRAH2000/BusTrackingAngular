import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/service/contact.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {
  constructor(public contactService:ContactService,public dialog:MatDialog,private spinner:NgxSpinnerService){}
  @ViewChild('ShowDetails')Details:any
  @ViewChild('ConfirmDeletion')Delete:any

  from:any
  to:any

  async ngOnInit()
  {
    this.spinner.show()
    await this.contactService.GetAllContacts()
    this.spinner.hide()
  }

  async DateInterval() {
    this.spinner.show()
    let today = new Date();
    debugger
    this.from = this.from == "" || this.from == undefined || this.from == null ? `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`: this.from
    this.to = this.to == "" || this.to == undefined || this.to == null ? `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` : this.to
    
    await this.contactService.GetAllContacts()

    this.contactService.AllContacts = this.contactService.AllContacts.filter((msg: any) => msg.sendtime >= this.from+'T00:00:00' && msg.sendtime <= this.to+'T23:59:59')
    this.spinner.hide()
  }
  async OpenDialog(myDialog:any,id:number)
  {
    this.spinner.show()
    await this.contactService.GetContactById(id)
    this.dialog.open(myDialog)
    this.spinner.hide()
  }

  async DeleteMessage(id:number)
  {
    this.spinner.show()
    await this.contactService.DeleteContact(id)
    await this.contactService.GetAllContacts()
    this.spinner.hide()
  }

  Replay()
  {
    window.location.assign(`mailto:${this.contactService.Contact.email}`)
  }
}
