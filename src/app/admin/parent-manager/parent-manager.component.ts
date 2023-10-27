import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParentService } from 'src/app/service/parent.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-parent-manager',
  templateUrl: './parent-manager.component.html',
  styleUrls: ['./parent-manager.component.css']
})
export class ParentManagerComponent {
  constructor(public parentService: ParentService,private userService:UserService, public dialog: MatDialog, public spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show()
    await this.parentService.GetAllParents()
    this.spinner.hide()
  }

  @ViewChild('ShowDetails') Details: any
  @ViewChild('ConfirmDeletion') Delete: any

  async OpenDialog(dia: any, id: number) {
    this.spinner.show()
    await this.parentService.GetParentWithStudentsById(id)
    this.dialog.open(dia)
    this.spinner.hide()
  }


  async Deleteparent(userid:number){
    this.spinner.show()
    await this.userService.DeleteUser(userid)
    await this.parentService.GetAllParents()
    this.spinner.hide()
  }
}
