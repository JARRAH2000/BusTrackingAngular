import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  studentImage: any = ''
  allStudents: any = []
  createdStudentId: any
  student: any
  absenceRecord: any = []
  AllAbsentStudents:any=[]

  async GetAllStudents() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/student/GetAllStudents").subscribe
        ({
          next: (res) => {
            this.allStudents = res
            //this.student = this.allStudents[0]
            //this.absenceRecord = this.student
            console.log('fetch students successfully')
            resolve()
          },
          error: () => {
            console.log('students error')
            reject()
          }
        })
    })
  }

  async GetStudentById(stdid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/student/GetStudentById/" + stdid).subscribe
        ({
          next: (res) => {
           
            this.student = res
            console.log('fetch student successfully')
            resolve()
          },
          error: () => {
            console.log('fetch student failed')
            reject()
          }
        })
    })
  }


  async GetStudentAbsenceById(stdid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/student/GetStudentAbsenceById/" + stdid).subscribe({
        next: (res:any) => {
          //debugger
          if(res)
          this.absenceRecord = res.absences
          console.log('absence record successfully')
          resolve()
        },
        error: () => {
          console.log('absence record failed')
          reject()
        }
      })
    })
  }



  async CreateStudent(student: any) {
    if (this.studentImage.image != "" && this.studentImage.image != null && this.studentImage.image != undefined) {
      student.image = this.studentImage.image
    }
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/student/CreateStudent", student).subscribe({
        next: (res) => {
          this.createdStudentId = res
          console.log('student created with id : ' + this.createdStudentId)
          resolve()
        },
        error: () => {
          console.log('student creation failed!!')
          reject()
        }
      })
    })
  }

  async UpdateStudent(updated: any) {
    if (this.studentImage.image != "" && this.studentImage.image != null && this.studentImage.image != undefined) {
      updated.image = this.studentImage.image
    }
    return await new Promise<void>((resolve, reject) => {
      this.http.put("https://localhost:44338/api/student/UpdateStudent", updated).subscribe({
        next: () => {
          //this.toastr.success('student updated')
          resolve()
        },
        error: () => {
          //this.toastr.error('update failed')
          reject()
        }
      })
    })
  }

  async UpdateStudentStatusInTrip(updateStatus: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.put("https://localhost:44338/api/student/UpdateStudentStatusInTrip", updateStatus).subscribe({
        next: () => {
          //this.toastr.success("student updated")
          resolve()
        },
        error: () => {
          //this.toastr.error("student updated Failed!!")
          reject()
        }
      })
    })
  }

  async UploadStudentImage(image: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/student/UploadStudentImage", image).subscribe({
        next: (res) => {
          this.studentImage = res
          resolve()
        },
        error: () => {
          console.log('uploading student image failed!!!')
          reject()
        }
      })
    })
  }


  async DeleteStudent(stdid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.delete("https://localhost:44338/api/student/DeleteStudent/" + stdid).subscribe({
        next: () => {
          console.log('delete student successfully')
          //this.toastr.success('student deleted')
          resolve()
        },
        error: () => {
          console.log('delete student failed')
          //this.toastr.error('deletion failed')
          reject()
        }
      })
    })
  }

  async GetAllAbsentStudents(){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/student/GetAllAbsentStudents").subscribe({
        next:(res)=>{
          this.AllAbsentStudents=res
          //this.toastr.success('All absent students')
          resolve()
        },
        error:()=>{
          //this.toastr.error('failed Absent Students')
          reject()
        }
      })
    })
  }
}
