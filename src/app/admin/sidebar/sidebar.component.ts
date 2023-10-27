import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarToggled = false;


  constructor(private route:Router)
  {

  }
  RouteTo(target:string)
  {
    this.route.navigate([target])
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
