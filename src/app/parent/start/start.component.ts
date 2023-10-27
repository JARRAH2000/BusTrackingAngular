import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ParentService } from 'src/app/service/parent.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare const $: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  isSidebarToggled = false;

  constructor(private userService:UserService,private parentService:ParentService, private router: Router,private toastr:ToastrService,private spinner:NgxSpinnerService) { }
  async ngAfterViewInit() {
    this.spinner.show()
    const user = localStorage.getItem('user')
    if (user) {
      
      let userInfo = JSON.parse(user)
      console.log(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.parentService.GetParentByUserId(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
      await this.userService.GetUserById(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])

      sessionStorage.setItem('id',this.userService.loggedUser.id)
      sessionStorage.setItem('firstname',this.userService.loggedUser.firstname)
      sessionStorage.setItem('middlename',this.userService.loggedUser.middlename)
      sessionStorage.setItem('lastname',this.userService.loggedUser.lastname)
      sessionStorage.setItem('sex',this.userService.loggedUser.sex=='M'?"Male":"Female")
      sessionStorage.setItem('birthdate',this.userService.loggedUser.birthdate.substring(0,10))
      sessionStorage.setItem('phone',this.userService.loggedUser.phone)
      sessionStorage.setItem('USERNAME',this.parentService.loggedParent.user.logins[0].email)
      console.log(this.parentService.loggedParent.id)
      sessionStorage.setItem('parentid',this.parentService.loggedParent.id)
      
      

      this.router.navigate(['Parent/Children'])
    }
    this.spinner.hide()
  }




  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    if (window.innerWidth < 768) {
      $('.sidebar .collapse').collapse('hide');
    }

    if (window.innerWidth < 480 && !this.isSidebarToggled) {
      this.toggleSidebar();
      $('.sidebar .collapse').collapse('hide');
    }
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    $('body').toggleClass('sidebar-toggled');
    $('.sidebar').toggleClass('toggled');

    if ($('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
    }
  }

  onScroll() {
    const scrollDistance = $(document).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  }

  scrollToTop() {
    const $anchor = $('.scroll-to-top');
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
  }
}
