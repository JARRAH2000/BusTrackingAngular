import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbsenceService } from 'src/app/service/absence.service';
import { StudentService } from 'src/app/service/student.service';
import { TeacherService } from 'src/app/service/teacher.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-absent-students',
  templateUrl: './absent-students.component.html',
  styleUrls: ['./absent-students.component.css']
})
export class AbsentStudentsComponent {
  constructor(public absenceService: AbsenceService, public studentService: StudentService, private teacherService: TeacherService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }

  @ViewChild('Absence') SaveAbsence: any
  @ViewChild('Attendence') StudentAttend: any

  studentToUpdated: any
  async ngAfterViewInit() {
    this.spinner.show()
    const token = localStorage.getItem('token')
    if (token) {
      let teacher: any = jwt_decode(token)
      await this.teacherService.GetTeacherByUserId(teacher['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
    }
    await this.studentService.GetAllAbsentStudents()
    this.spinner.hide()
  }

  AttendToSchoolDialog(studentId: number) {
    this.spinner.show()
    this.studentToUpdated = studentId
    this.dialog.open(this.StudentAttend)
    this.spinner.hide()
  }

  ConfirmAbsenceDialog(){
    this.spinner.show()
    this.dialog.open(this.SaveAbsence)
    this.spinner.hide()
  }

  async SetAsAttendence() {
    this.spinner.show()
    await this.studentService.UpdateStudentStatusInTrip({
      id: this.studentToUpdated,
      statusid: 21,
      currenttrip: null
    })
    this.studentToUpdated=null
    await this.studentService.GetAllAbsentStudents()
    this.spinner.hide()
  }


  async SaveAllAbsence() {
    debugger
    //this.spinner.show()
    let today = new Date()
    await this.studentService.AllAbsentStudents.forEach((student: any) => {
      this.absenceService.CreateAbsence({
        checkingtime: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
        studentid: student.id,
        teacherid: this.teacherService.loggedTeacher.id
      })
    });
    await this.studentService.GetAllAbsentStudents()
    //this.spinner.hide()
  }
}
