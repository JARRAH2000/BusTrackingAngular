import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/service/student.service';



import { Chart, registerables } from 'node_modules/chart.js'
import { TripService } from 'src/app/service/trip.service';

Chart.register(...registerables)


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private userService: UserService, public studentService: StudentService,private tripService:TripService, private router: Router, private toastr: ToastrService) { }

  RenderSexChart() {
    var myPieChart = new Chart("myPieChart", {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          data: [this.studentService.allStudents.filter((s: any) => s.sex == 'M').length, this.studentService.allStudents.filter((s: any) => s.sex == 'F').length],
          backgroundColor: ["#36a2eb", "#ff6384"],
        }]
      }
    });
  }
  RenderTripChart() {
    const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JAN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    var myBarChart = new Chart("MyAreaChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number Of Trips',
          data: this.tripEachMonth,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 2
        }]
      }
    })
  }


  tripEachMonth:any=[]
  async ngOnInit() {
    await this.studentService.GetAllStudents()
    await this.tripService.CountOfTripsEachMonth()
    this.tripService.tripReport.forEach((trip:any) => {
      this.tripEachMonth.push(trip.countOfTrips)
    });
    console.log(this.tripEachMonth)
    this.RenderSexChart()
    this.RenderTripChart()
  }


  async ngAfterViewInit() {
    const user = localStorage.getItem('user')
    if (user) {
      let userInfo = JSON.parse(user)
      console.log(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.userService.GetUserById(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])

      sessionStorage.setItem('id', this.userService.loggedUser.id)
      sessionStorage.setItem('firstname', this.userService.loggedUser.firstname)
      sessionStorage.setItem('middlename', this.userService.loggedUser.middlename)
      sessionStorage.setItem('lastname', this.userService.loggedUser.lastname)
      sessionStorage.setItem('sex', this.userService.loggedUser.sex == 'M' ? "Male" : "Female")
      sessionStorage.setItem('birthdate', this.userService.loggedUser.birthdate.substring(0, 10))
      sessionStorage.setItem('phone', this.userService.loggedUser.phone)
      sessionStorage.setItem('USERNAME', userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'])
    }
  }



  RouteTo(target: string) {
    this.router.navigate([target])
  }
}

