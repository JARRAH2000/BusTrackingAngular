import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-teacher-manager',
  templateUrl: './teacher-manager.component.html',
  styleUrls: ['./teacher-manager.component.css']
})
export class TeacherManagerComponent {
  constructor(public teacherService: TeacherService, private dialog: MatDialog, private userService: UserService, public spinner: NgxSpinnerService) { }

  @ViewChild('ShowDetails') Details: any
  @ViewChild('ConfirmDeletion') Delete: any
  async ngOnInit() {
    this.spinner.show()
    await this.teacherService.GetAllTeachers()
    this.spinner.hide()
  }

  async OpenDialog(dia: any, id: number) {
    this.spinner.show()
    await this.teacherService.GetTeacherById(id)
    this.dialog.open(dia)
    this.spinner.hide()
  }

  async UpdateTeacher(teacherid: number, newStatus: number) {
    this.spinner.show()
    debugger
    let updated = {
      id: teacherid,
      statusid: newStatus
    }
    await this.teacherService.UpdateTeacher(updated)

    this.spinner.hide()
  }


  async DeleteTeacher(userid: number) {
    this.spinner.show()
    await this.userService.DeleteUser(userid)
    await this.teacherService.GetAllTeachers()
    this.spinner.hide()
  }

}
