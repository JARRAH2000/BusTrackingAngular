import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ParentService } from 'src/app/service/parent.service';
import { StudentService } from 'src/app/service/student.service';
import { Router } from '@angular/router';
import { TripService } from 'src/app/service/trip.service';
@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent {

  @ViewChild('AbsenceRecordDialog') StudentAbsenceRecord: any

  constructor(public parentService: ParentService, public studentService: StudentService,private tripService:TripService, private dialog: MatDialog,private router:Router, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.spinner.show()
    this.parentService.GetParentWithStudentsById(Number(sessionStorage.getItem('parentid')))
    this.spinner.hide()
   }

  /*async ngAfterViewInit() {
    this.spinner.show()
    await this.parentService.GetParentWithStudentsById(Number(sessionStorage.getItem('parentid')))
    this.spinner.hide()
  }*/

 async OpenViewParent(currentTrip:number){
    sessionStorage.setItem('CURRENTTRIP',String(currentTrip))
    await this.tripService.TripDetails(Number(sessionStorage.getItem('CURRENTTRIP')))


    this.router.navigate(['Parent/ParentView'])
  }

  async AbsenceRecord(studentId: number) {
    this.spinner.show()
    await this.studentService.GetStudentAbsenceById(studentId)
    if (this.studentService.absenceRecord.length != 0)
      this.dialog.open(this.StudentAbsenceRecord)
    //else this.toastr.error('No Absneces')
    this.spinner.hide()
  }
}
