import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-studentslist',
  templateUrl: './studentslist.component.html',
  styleUrls: ['./studentslist.component.css']
})
export class StudentslistComponent {
  constructor(private router:Router,public studentService:StudentService){}

  ngOnInit()
  {
    this.studentService.GetAllStudents()
  }
  
  ShowProfile(n:string,i:string,s:number) {
    this.router.navigate(['Person'],{ queryParams: { name: n,image:i,status:s }});
  }

}
