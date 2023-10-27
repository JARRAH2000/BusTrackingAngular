import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  constructor( public studentService: StudentService, public busService: BusService, public driverService: DriverService,public teacherService:TeacherService,private tripService:TripService,private tripStudentService:TripstudentService,private router:Router, private spinner: NgxSpinnerService,public toastr:ToastrService) { }
  triptype:any
  
  inHomeStudents: any = []
  inTripStudents: any = []
  points: any = []
  routingControl: any
  map: any
  direction: any = 'In Home'

  totalCapacity:number=0
  async TripType(type: any) {
    this.spinner.show()
    this.direction = type
    await this.studentService.GetAllStudents()
    this.inHomeStudents = this.studentService.allStudents.filter((f: any) => f.status.status == type)
    this.inTripStudents = []
    this.spinner.hide()
  }
  selectedBusId:any
  selectedDriverId:any
  async GetBusById(){
    await this.busService.GetBusById(this.selectedBusId)
    console.log('chosen bus: '+this.busService.bus)
  }
  async GetDriverById(){
    await this.driverService.GetDriverById(this.selectedDriverId)
    console.log('chosen driver: '+this.driverService.driver)
  }

  async StartTrip(){
    let today=new Date()
    const Trip={
      teacherid:this.teacherService.loggedTeacher.id,
      busid:this.busService.bus.id,
      driverid:this.driverService.driver.id,
      tripdate:`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T00:00:00`,
      starttime:`${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`,
      endtime:`${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`,//modify it
      directionid:(this.direction=='In Home'?21:22),//Bus:To Home
      longitude:String(this.teacherService.teacherLongitude),
      latitude:String(this.teacherService.teacherLatitude)
    }

    await this.tripService.CreateTrip(Trip)
    
    await this.inTripStudents.forEach((student:any) => {
      const TripStudent={
        studentid:student.id,
        tripid:this.tripService.createdTripId,
        arrivaltime:`${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`,//modify it
      }
      const NextStatus={
        id:student.id,
        name:student.name,
        image:student.image,
        birthdate:student.birthdate,
        latitude:student.latitude,
        longitude:student.latitude,
        busnotify:student.busnotify,
        inhomenotify:student.inhomenotify,
        inschoolnotify:student.inschoolnotify,
        tohomenotify:student.tohomenotify,
        toschoolnotify:student.toschoolnotify,
        absencenotify:student.absencenotify,
        parentid:student.parentid,
        statusid:this.direction=='In School'?22:25,
        currenttrip:this.tripService.createdTripId
      }
       this.studentService.UpdateStudentStatusInTrip(NextStatus)
       this.tripStudentService.CreateTripStudent(TripStudent)
        ///
             
      })
      if(this.map)
      {
        this.map.remove();
        this.map = null;
      }
      if(this.direction=='In Home')
      this.router.navigate(['Teacher/ToSchoolTrip'])
      else this.router.navigate(['Teacher/ToHomeTrip'])  
  }

  async ngOnInit() {
    this.spinner.show()
    await this.studentService.GetAllStudents()
    this.inHomeStudents = this.studentService.allStudents.filter((std: any) => std.status.status == 'In Home')
    
    const user=localStorage.getItem('user')
    if(user){
      let userInfo=JSON.parse(user)
      console.log(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.teacherService.GetTeacherByUserId(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
    }
    if(this.teacherService.loggedTeacher.currenttrip!=null&&this.teacherService.loggedTeacher.currenttrip!=undefined&&this.teacherService.loggedTeacher.currenttrip!=""){
      if(this.map)
      {
        this.map.remove();
        this.map = null;
      }


      await this.tripService.GetTripById(this.teacherService.loggedTeacher.currenttrip)
      if(this.tripService.runningTrip.directionid==21)
      this.router.navigate(['Teacher/ToSchoolTrip'])
      else this.router.navigate(['Teacher/ToHomeTrip'])
    }

    await this.busService.GetAvailableBuses()
    await this.driverService.GetAvailableDrivers()

    this.spinner.hide()
  }

  async func(student: any) {
    if(this.busService.bus==""||this.busService.bus==null||this.busService.bus==undefined)this.toastr.error('Choose bus first!')
    else if(this.driverService.driver==""||this.driverService.driver==null||this.driverService.driver==undefined)this.toastr.error('Chooose driver first!')
    else if(this.points.length>=this.busService.bus.capacity)this.toastr.error('Bus is Full')
    else{
      this.totalCapacity=this.busService.bus.capacity
      let passengers=document.getElementById('passengers') as HTMLElement
      passengers.style.display="block"
      this.inTripStudents.push(student)
      this.inHomeStudents = this.inHomeStudents.filter((s: any) => s.id != student.id)
      this.points.push(L.latLng(student.latitude, student.longitude))
      console.log(this.points)
      await this.routingControl.setWaypoints(this.points)
    }
  }

  async del(student: any) {
    this.inTripStudents = this.inTripStudents.filter((s: any) => s.id != student.id)
    if(this.inTripStudents.length<=1){
      let passengers=document.getElementById('passengers') as HTMLElement
      passengers.style.display="none"
    }else{
      let passengers=document.getElementById('passengers') as HTMLElement
      passengers.style.display="display"
    }
    this.points = this.points.filter((s: any) => s.lat != student.latitude && s.lng != student.longitude)
    //this.points.filter((point: any) => point.lat != student.latitude && point.lng != student.longitude);
    this.inHomeStudents.push(student)
    await this.routingControl.setWaypoints(this.points)
    // this.routingControl.routeWhileDragging=true
  }

  async ngAfterViewInit() {
    await this.teacherService.GetStartPosition()
    console.log(this.teacherService.teacherLatitude+'\n')
    console.log(this.teacherService.teacherLongitude+'\n')

    // Define the
    this.points = [L.latLng(this.teacherService.teacherLatitude,this.teacherService.teacherLongitude)];
    
    // Define the starting point (you can choose any point as the starting point)
    const start = this.points[0];
    // Create a map object
    this.map = L.map('map').setView(start, 13);
    this.routingControl = L.Routing.control({
      summaryTemplate:''
    }).addTo(this.map)

    this.routingControl.setWaypoints(this.points)
    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
  }
  
}



  /*shortestPath(){
    // Define the Nearest Neighbor algorithm
    /*  function nearestNeighbor(points: L.LatLng[]): L.LatLng[] {
       const tour: L.LatLng[] = [];
       const visited: boolean[] = Array(points.length).fill(false);
       let current = start;
       visited[points.indexOf(start)] = true;
       tour.push(current);
       while (tour.length < points.length) {
         let nearest: L.LatLng | null = null;
         let minDist = Infinity;
         for (const point of points) {
           if (!visited[points.indexOf(point)]) {
             const dist = current.distanceTo(point);
             if (dist < minDist) {
               nearest = point;
               minDist = dist;
             }
           }
         }
         if (nearest) {
           visited[points.indexOf(nearest)] = true;
           tour.push(nearest);
           current = nearest;
         } else {
           break;
         }
       }
       // Return to the starting point to complete the tour
       tour.push(start);
       return tour;
     }
      // Find the tour using the Nearest Neighbor algorithm
     const tour = nearestNeighbor(this.points);
     // Create a routing control with the tour as the waypoints
     L.Routing.control({
       waypoints: tour,
       routeWhileDragging: true,
     }).addTo(this.map);
    
  }*/



  /* ngOnInit() {
  // Create a map object
  var map = L.map('map').setView([32.46891968854494, 35.787507951757455], 13);

  // Add a tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  // Add a routing control
  L.Routing.control({
    waypoints: [
      L.latLng(32.46949688031332, 35.79487925268347),
      L.latLng(32.458488285005044, 35.79056133783677),
      L.latLng(32.47293780509015, 35.79739858513399),
      L.latLng(32.46891968854494, 35.787507951757455)
    ],
    routeWhileDragging: true
  }).addTo(map);

} */




  /* this.map.on('click', (e: any) => {
        this.points.push(e.latlng)
        L.Routing.control({
          waypoints: this.points,
          routeWhileDragging: true
        }).addTo(this.map);
      }) */
  //debugger

