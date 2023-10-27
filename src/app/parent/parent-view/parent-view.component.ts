import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/service/content.service';
import { StudentService } from 'src/app/service/student.service';
import { TripService } from 'src/app/service/trip.service';
import { TripstudentService } from 'src/app/service/tripstudent.service';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent {
  constructor(public tripService: TripService, public studentService: StudentService, private tripStudentService: TripstudentService, private contentService: ContentService, private spinner: NgxSpinnerService) {
    this.spinner.show()
    this.CurrnetTripId = sessionStorage.getItem('CURRENTTRIP')
    this.spinner.hide()
  }


  CurrnetTripId: any

  map: any
  routingControl: any
  studentsOntheMap: any = []


  busIcon:any


  busPlace: any
  schoolPlace: any


  currentLatitude: any
  currentLongitude: any
  async ngAfterViewInit() {
    this.spinner.show()


    if(this.CurrnetTripId)
    await this.tripService.GetTripById(this.CurrnetTripId)
    await this.contentService.GetAllContent()

    this.studentsOntheMap.push(L.latLng(this.contentService.content[0].latitude, this.contentService.content[0].longitude))


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

    this.spinner.hide()
  }

  async UpdateLocation() {
    this.map.removeLayer(this.busPlace)
    this.studentsOntheMap = this.studentsOntheMap.filter((s: any) => s.lat != Number(this.currentLatitude) && s.lng != Number(this.currentLongitude))
    await this.tripService.GetTripById(this.CurrnetTripId)
    this.studentsOntheMap.push(L.latLng(this.tripService.runningTrip.latitude, this.tripService.runningTrip.longitude))
    this.currentLatitude = this.tripService.runningTrip.latitude
    this.currentLongitude = this.tripService.runningTrip.longitude
    this.busPlace = L.marker([this.currentLatitude, this.currentLongitude], { icon: this.busIcon }).addTo(this.map)
    console.log('current : ' + this.currentLongitude)
    this.routingControl.setWaypoints(this.studentsOntheMap)
  }


  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
