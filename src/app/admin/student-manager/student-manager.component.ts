import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent {
  constructor(public studentService: StudentService, public spinner: NgxSpinnerService, private dialog: MatDialog) { }

  @ViewChild('ShowDetails') Details: any
  @ViewChild('ConfirmDeletion') Delete: any

  @ViewChild('Update') Update: any

  updateForm: any = new FormGroup({})


  async ngOnInit() {
    this.spinner.show()
    await this.studentService.GetAllStudents()
    this.spinner.hide()
  }

  async OpenDialog(dia: any, stdid: number) {
    this.spinner.show()
    await this.studentService.GetStudentById(stdid)
    await this.studentService.GetStudentAbsenceById(stdid)

    this.updateForm = new FormGroup({
      id: new FormControl(this.studentService.student.id, [Validators.required]),
      name: new FormControl(this.studentService.student.name, [Validators.required, Validators.maxLength(50)]),
      longitude: new FormControl(this.studentService.student.longitude, [Validators.required, Validators.maxLength(50)]),
      latitude: new FormControl(this.studentService.student.latitude, [Validators.required, Validators.maxLength(50)]),
      image: new FormControl(this.studentService.student.image)
    })

    this.dialog.open(dia)
    this.spinner.hide()
  }

  async UpdateStudent() {
    this.spinner.show()
    if (this.updateForm.valid) {
      await this.studentService.UpdateStudent(this.updateForm.value)
    }
    await this.studentService.GetAllStudents()
    this.OpenDialog(this.Details, this.studentService.student.id)
    await this.studentService.GetStudentById(this.studentService.student.id)

    this.spinner.hide()
  }

  async DeleteStudent(stdid: number) {
    this.spinner.show()
    await this.studentService.DeleteStudent(stdid)
    await this.studentService.GetAllStudents()
    this.spinner.hide()
  }



  async UploadStudentImage(files: any) {
    if (files.length == 0) return;
    let formData = new FormData()
    formData.append('file', files[0])
    await this.studentService.UploadStudentImage(formData)
    let img = document.getElementById("chosenImage") as HTMLImageElement
    let rem = document.getElementById("remove") as HTMLButtonElement
    let input = document.getElementById("image") as HTMLInputElement
    if (img) {
      img.src = "../../../assets/Images/" + this.studentService.studentImage.image
      rem.style.display = "block"
      input.style.display = "none"
    }
  }

  RemoveImage() {
    let img = document.getElementById("chosenImage") as HTMLImageElement
    let rem = document.getElementById("remove") as HTMLButtonElement
    let input = document.getElementById("image") as HTMLInputElement
    if (img) {
      img.src = "https://via.placeholder.com/150"
      rem.style.display = "none"
      this.studentService.studentImage = ""
      input.style.display = "block"
    }
  }
}
