import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  createdTeacherId: any

  loggedTeacher: any

  teacherLatitude: any
  teacherLongitude: any
  async GetStartPosition() {
    return await new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        this.teacherLatitude = position.coords.latitude;
        this.teacherLongitude = position.coords.longitude;
        resolve()
      },
        () => {
          reject()
        })
    })
  }


  async CreateTeacher(object: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/teacher/CreateTeacher", object).subscribe({
        next: (res) => {
          this.createdTeacherId = res
          resolve()
        },
        error: () => {
          console.log('teacher creation failed!!')
          reject()
        }
      })
    })
  }

  allTeachers: any = []
  teacher: any
  async GetAllTeachers() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/teacher/GetAllTeachers").subscribe({
        next: (res) => {
          this.allTeachers = res
          this.teacher = this.allTeachers[0]
          resolve()
          console.log('fetch teachers done!')
        },
        error: () => {
          console.log('fetch teachers failed')
          reject()
        }
      })
    })
  }

  async GetTeacherById(id: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/teacher/GetTeacherById/" + id).subscribe({
        next: (res) => {
          this.teacher = res
          console.log("teacher success")
          resolve()
        },
        error: () => {
          console.log('teacher failed!!')
          reject()
        }
      })
    })
  }

  async GetTeacherByUserId(userid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/teacher/GetTeacherByUserId/" + userid).subscribe({
        next: (res) => {
          this.loggedTeacher = res
          console.log("logged teacher success")
          resolve()
        },
        error: () => {
          console.log('logged teacher failed!!')
          reject()
        }
      })
    })
  }



  async UpdateTeacher(object: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.put("https://localhost:44338/api/teacher/UpdateTeacher", object).subscribe({
        next: () => {
          console.log('teacher updated successfully')
          this.GetAllTeachers()
          resolve()
        },
        error: () => {
          console.log('update teacher failed')
          reject()
        }
      })
    })
  }
}
