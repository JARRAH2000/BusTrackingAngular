import { Component } from '@angular/core';

import { HostListener } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  isSidebarToggled = false;

  

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

