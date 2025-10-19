import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CountdownModule,
    HttpClientModule,
    CommonModule,
    RouterLink
    // … các modules khác

  ],

})



export class HomeComponent implements OnInit {
  defaultImg = ''
  banner: any = {}
  about: any = {}
  course: any = {}
  campus: any = {}
  steps: any = {}
  admission: any = {}
  news: any = {}
  newList: any = []
  eventList: any = []
  courseList: any = []
  events: any = {}
  intervalID: any
  days: any = 0
  hours: any = 0
  minutes: any = 0
  seconds: any = 0
  owlCarousel: any = {}
  magnificPopup:any = {}


  constructor(private http: HttpClient) { }


  ngOnInit(): void {

    this.getData();
    this.getDate();
    this.intervalID = setInterval(() => this.getDate(), 1000);
    this.studySlides();

  }


  getData() {
    this.http.get<any[]>('data.json')
      .subscribe((data: any) => {

        this.banner = data.homePage.banner
        this.about = data.homePage.about
        this.course = data.homePage.course
        this.campus = data.homePage.campus
        this.steps = data.homePage.steps
        this.admission = data.homePage.admission
        this.news = data.homePage.news
        this.newList = data.newList
        this.eventList = data.eventList.slice(0, 3)
        this.courseList = data.courseList.slice(0, 4)
        this.events = data.homePage.events

        console.log(this.eventList);

      });



  }


  getDate() {
    const now = new Date();
    const target = new Date('2026-01-02T00:00:00'); // Mốc kết thúc

    const diffInSeconds = target.getTime() - now.getTime();

    if (diffInSeconds <= 0) {
      clearInterval(this.intervalID);
      this.days = this.hours = this.minutes = this.seconds = 0;
    }
    else {
      this.days = Math.floor(diffInSeconds / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diffInSeconds / (1000 * 60 * 60)) % 24);
      this.minutes = Math.floor((diffInSeconds / (1000 * 60)) % 60);
      this.seconds = Math.floor((diffInSeconds / 1000) % 60);
    }
  }


  studySlides() {
    $('.study-slider').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayHoverPause: true,
      navText: [
        "<i class='ri-arrow-left-line'></i>",
        "<i class='ri-arrow-right-line'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        414: {
          items: 1,
        },
        576: {
          items: 2,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
      },
    });
  }


  playVideo(){
    $('.popup-youtube, .popup-vimeo').magnificPopup({
      disableOn: 300,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  }


}
