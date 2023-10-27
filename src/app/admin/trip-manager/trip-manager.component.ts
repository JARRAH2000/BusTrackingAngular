import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { TripService } from 'src/app/service/trip.service';

@Component({
  selector: 'app-trip-manager',
  templateUrl: './trip-manager.component.html',
  styleUrls: ['./trip-manager.component.css']
})
export class TripManagerComponent {
  constructor(public tripService:TripService,private spinner:NgxSpinnerService){}

  async ngAfterViewInit(){
    this.spinner.show()
    await this.tripService.GetAllTrips()
    debugger
    console.log(this.tripService.allTrips)
    this.spinner.hide()
  }


  from: any
  to: any
  async DateInterval() {
    this.spinner.show()
    let today = new Date();
    this.from = this.from == "" || this.from == undefined || this.from == null ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` : this.from
    this.to = this.to == "" || this.to == undefined || this.to == null ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` : this.to
    await this.tripService.GetAllTrips()
    this.tripService.allTrips = this.tripService.allTrips.filter((trip: any) => trip.tripdate >= this.from + 'T00:00:00' && trip.tripdate <= this.to + 'T23:59:59')
    
    this.spinner.hide()
  }
}
