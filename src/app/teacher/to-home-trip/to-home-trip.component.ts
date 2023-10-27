import { Component, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { StudentService } from 'src/app/service/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusService } from 'src/app/service/bus.service';
import { DriverService } from 'src/app/service/driver.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { TripService } from 'src/app/service/trip.service';
import { TripstudentService } from 'src/app/service/tripstudent.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/service/content.service';
@Component({
  selector: 'app-to-home-trip',
  templateUrl: './to-home-trip.component.html',
  styleUrls: ['./to-home-trip.component.css']
})
export class ToHomeTripComponent {
  constructor(private contentService:ContentService,public studentService: StudentService, public busService: BusService, public driverService: DriverService, public teacherService: TeacherService, private tripService: TripService, private tripStudentService: TripstudentService, private dialog: MatDialog, private router: Router, private spinner: NgxSpinnerService, public toastr: ToastrService) { }

  @ViewChild('SchoolBackConfirm')BackSchoolConfirm : any
  @ViewChild('EndTripConfirm')EndConfirm : any

  intervalId:any


  InBusStudents:any=[]
  DroppedStudents:any=[]

  studentsOntheMap: any = []

  map: any
  routingControl: any


  currentLatitude: any
  currentLongitude: any
  busPlace: any
  schoolPlace: any
  busIcon: any
  
 /*  async ngOnInit() {
    this.spinner.show()
    const user = localStorage.getItem('user')
    if (user) {
      let teacherInfo = JSON.parse(user)
      await this.teacherService.GetTeacherByUserId(teacherInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.tripStudentService.GetTripStudentsByTripId(this.teacherService.loggedTeacher.currenttrip)
      this.tripStudentService.studentsInTrip.forEach((Tstudents: any) => {
        this.studentsOntheMap.push(L.latLng(Tstudents.student.latitude, Tstudents.student.longitude))
      });
      // this.InBusStudents = this.tripStudentService.studentsInTrip
      this.InBusStudents = this.tripStudentService.studentsInTrip.filter((std:any)=>std.student.statusid==22)
      this.DroppedStudents=this.tripStudentService.studentsInTrip.filter((std:any)=>std.student.statusid==1)
      await this.routingControl.setWaypoints(this.studentsOntheMap)
    }
    console.log(this.teacherService.teacherLatitude + '\n')
    console.log(this.teacherService.teacherLongitude)
    this.spinner.hide()
  } */


  async ngAfterViewInit() {
    this.spinner.show()
    const user = localStorage.getItem('user')
    if (user) {
      let teacherInfo = JSON.parse(user)
      await this.teacherService.GetTeacherByUserId(teacherInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.tripStudentService.GetTripStudentsByTripId(this.teacherService.loggedTeacher.currenttrip)
      this.tripStudentService.studentsInTrip.forEach((Tstudents: any) => {
        this.studentsOntheMap.push(L.latLng(Tstudents.student.latitude, Tstudents.student.longitude))
      });
      // this.InBusStudents = this.tripStudentService.studentsInTrip
      this.InBusStudents = this.tripStudentService.studentsInTrip.filter((std:any)=>std.student.statusid==22)
      this.DroppedStudents=this.tripStudentService.studentsInTrip.filter((std:any)=>std.student.statusid==1)
      //await this.routingControl.setWaypoints(this.studentsOntheMap)
    }
    console.log(this.teacherService.teacherLatitude + '\n')
    console.log(this.teacherService.teacherLongitude)
    

    await this.teacherService.GetStartPosition()
    this.studentsOntheMap.push(L.latLng(this.teacherService.teacherLatitude, this.teacherService.teacherLongitude))

    await this.contentService.GetAllContent()

    this.currentLatitude = this.teacherService.teacherLatitude
    this.currentLongitude = this.teacherService.teacherLongitude
    this.studentsOntheMap.push(L.latLng(this.contentService.content[0].latitude, this.contentService.content[0].longitude))

    let IconSchool = L.icon({
      iconUrl: '../../assets/Images/schoolIcon.png',
      iconSize: [50, 50]
    })
    this.busIcon = L.icon({
      iconUrl: '../../assets/Images/1c857c18-05ee-409c-89e2-b72032d0735e_download.jpeg',
      iconSize: [50, 50]
    })


    const start = this.studentsOntheMap[0];
    // Create a map object
    this.map = L.map('map').setView(start, 13);
    this.routingControl = L.Routing.control({
      summaryTemplate: ''
    }).addTo(this.map)

    await this.routingControl.setWaypoints(this.studentsOntheMap)
    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    
    this.schoolPlace = L.marker([this.contentService.content[0].latitude, this.contentService.content[0].longitude], { icon: IconSchool }).addTo(this.map)
    this.busPlace = L.marker([this.teacherService.teacherLatitude, this.teacherService.teacherLongitude], { icon: this.busIcon }).addTo(this.map)

    this.intervalId= setInterval(() => this.UpdateLocation(), 5000)
    
    this.spinner.hide();
  }


  async UpdateLocation() {
    console.log('update')
    let lat: any = ''
    let lng: any = ''
    navigator.geolocation.getCurrentPosition(position => {
      lat = String(position.coords.latitude);
      lng = String(position.coords.longitude);
      console.log(lat)
      console.log(lng)
    })
    await this.tripService.UpdateTrip({
      id: this.teacherService.loggedTeacher.currenttrip,
      longitude: lng,
      latitude: lat
    });

    this.map.removeLayer(this.busPlace)
    this.studentsOntheMap = this.studentsOntheMap.filter((s: any) => s.lat != Number(this.currentLatitude) && s.lng != Number(this.currentLongitude))
    await this.tripService.GetTripById(this.teacherService.loggedTeacher.currenttrip)
    this.studentsOntheMap.push(L.latLng(this.tripService.runningTrip.latitude, this.tripService.runningTrip.longitude))
    this.currentLatitude = this.tripService.runningTrip.latitude
    this.currentLongitude = this.tripService.runningTrip.longitude
    this.busPlace = L.marker([this.currentLatitude, this.currentLongitude], { icon: this.busIcon }).addTo(this.map)
    console.log('current : ' + this.currentLongitude)
    this.routingControl.setWaypoints(this.studentsOntheMap)
  }


  async Drop(Tstudent:any){
    const student={
      id:Tstudent.studentid,
      statusid:1,
      currenttrip:null
    }
    this.DroppedStudents.push(Tstudent)
    this.InBusStudents=this.InBusStudents.filter((std:any)=>std.studentid!=Tstudent.studentid)
    await this.studentService.UpdateStudentStatusInTrip(student)
    
    let today=new Date()
    await this.tripStudentService.UpdateStudentTrip({
      id: Tstudent.id,
      studentid: Tstudent.studentid,
      tripid: Tstudent.tripid,
      arrivaltime: `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`

    })
    if(this.teacherService.loggedTeacher.currenttrip!=null&&this.teacherService.loggedTeacher.currenttrip!=undefined&&this.teacherService.loggedTeacher.currenttrip!="")

    await this.tripStudentService.GetTripStudentsByTripId(this.teacherService.loggedTeacher.currenttrip)
  }
  
  async Grab(Tstudent:any){
    const student={
      id:Tstudent.studentid,
      statusid:22,
      currenttrip:this.teacherService.loggedTeacher.currenttrip//null///
    }
    this.InBusStudents.push(Tstudent)
    this.DroppedStudents=this.DroppedStudents.filter((std:any)=>std.studentid!=Tstudent.studentid)
    await this.studentService.UpdateStudentStatusInTrip(student)
    if(this.teacherService.loggedTeacher.currenttrip!=null&&this.teacherService.loggedTeacher.currenttrip!=undefined&&this.teacherService.loggedTeacher.currenttrip!="")
    await this.tripStudentService.GetTripStudentsByTripId(this.teacherService.loggedTeacher.currenttrip)
  }

  EndTripDialog(){
    clearInterval(this.intervalId)

    if(this.InBusStudents.length!=0){
      this.dialog.open(this.BackSchoolConfirm)
    }
    else{
      this.dialog.open(this.EndConfirm)
    }
  }

  async EndTrip(action:string){
    this.dialog.closeAll()
    if(action=='Back'){
      await this.InBusStudents.forEach((Tstudent: any) => {
        this.studentService.UpdateStudentStatusInTrip({
          id: Tstudent.studentid,
          statusid: 21,
          currenttrip: null
        })
      });
    }
    
    let today=new Date()
    await this.tripService.EndTrip({
      id: this.teacherService.loggedTeacher.currenttrip,
      endtime: `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`,
      longitude: String(this.teacherService.teacherLongitude),
      latitude: String(this.teacherService.teacherLatitude)
    })


    this.spinner.hide()
    this.router.navigate(['Teacher/CreateTrip'])
  }
}
