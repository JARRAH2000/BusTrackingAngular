import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class StudentstatusService {

  constructor(private http: HttpClient) { }
  AllStatuses: any = []
  async GellAllStudentStatuses() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/studentstatus/GetAllStudentStatuses").subscribe({
        next: (res) => {
          this.AllStatuses = res
          resolve()
        },
        error: () => {
          console.log('std statuses failed!!')
          reject()
        }
      })
    })
  }
}
