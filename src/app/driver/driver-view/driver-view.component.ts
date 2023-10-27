import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/service/driver.service';
import { TripService } from 'src/app/service/trip.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { TripstudentService } from 'src/app/service/tripstudent.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/service/content.service';
@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.css']
})
export class DriverViewComponent {
  constructor(public driverService: DriverService, public tripService: TripService, private tripStudentService: TripstudentService, private contentService: ContentService, private router: Router, private spinner: NgxSpinnerService) { }
  map: any
  routingControl: any
  studentsOntheMap: any = []
  async ngAfterViewInit() {

    const user = localStorage.getItem('user')
    if (user) {
      let userInfo = JSON.parse(user)
      console.log(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.driverService.GetDriverByUserId(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
    }

    if (this.driverService.loggedDriver.currenttrip) {
      //this.toastr.error(`this.driverService.loggedDriver.currenttrip`)
      await this.tripService.GetTripById(this.driverService.loggedDriver.currenttrip)

      await this.tripStudentService.GetTripStudentsByTripId(this.driverService.loggedDriver.currenttrip)
      this.tripStudentService.studentsInTrip.forEach((Tstudents: any) => {
        this.studentsOntheMap.push(L.latLng(Tstudents.student.latitude, Tstudents.student.longitude))
      });

      await this.contentService.GetAllContent()
    }
    else {
      this.router.navigate(["Driver"])
    }
    //school Place
    this.studentsOntheMap.push(L.latLng(this.contentService.content[0].latitude, this.contentService.content[0].longitude))
    //32.47604235152809, 35.79857441889686

    this.currentLatitude = this.tripService.runningTrip.latitude
    this.currentLongitude = this.tripService.runningTrip.longitude
    this.studentsOntheMap.push(L.latLng(this.tripService.runningTrip.latitude, this.tripService.runningTrip.longitude))
    // Define the

    let IconSchool = L.icon({
      iconUrl: '../../assets/Images/schoolIcon.png',
      iconSize: [50, 50]
    })
    this.busIcon = L.icon({
      iconUrl: '../../assets/Images/1c857c18-05ee-409c-89e2-b72032d0735e_download.jpeg',
      iconSize: [50, 50]
    })


    // Define the starting point (you can choose any point as the starting point)
    const start = this.studentsOntheMap[this.studentsOntheMap.length - 1];
    // Create a map object
    this.map = L.map('map').setView(start, 13);
    this.routingControl = L.Routing.control({
      summaryTemplate: ''
    }).addTo(this.map)

    this.routingControl.setWaypoints(this.studentsOntheMap)
    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    this.schoolPlace = L.marker([this.contentService.content[0].latitude, this.contentService.content[0].longitude], { icon: IconSchool }).addTo(this.map)
    this.busPlace = L.marker([this.currentLatitude, this.currentLongitude], { icon: this.busIcon }).addTo(this.map)
    console.log('BUS : ' + this.busPlace)
    setInterval(() => this.UpdateLocation(), 5000)
  }

  currentLatitude: any
  currentLongitude: any
  busPlace: any
  schoolPlace: any
  busIcon: any

  async UpdateLocation() {
    this.map.removeLayer(this.busPlace)
    this.studentsOntheMap = this.studentsOntheMap.filter((s: any) => s.lat != Number(this.currentLatitude) && s.lng != Number(this.currentLongitude))
    await this.tripService.GetTripById(this.driverService.loggedDriver.currenttrip)
    this.studentsOntheMap.push(L.latLng(this.tripService.runningTrip.latitude, this.tripService.runningTrip.longitude))
    this.currentLatitude = this.tripService.runningTrip.latitude
    this.currentLongitude = this.tripService.runningTrip.longitude
    this.busPlace = L.marker([this.currentLatitude, this.currentLongitude], { icon: this.busIcon }).addTo(this.map)
    console.log('current : ' + this.currentLongitude)
    this.routingControl.setWaypoints(this.studentsOntheMap)
  }

  RouteTo(target: string) {
    this.router.navigate([target])
  }
}
