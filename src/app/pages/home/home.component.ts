import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
   imports: [
    HttpClientModule,
    CommonModule
    // … các modules khác
  ],
})
export class HomeComponent implements OnInit{
  defaultImg = ''
  banner: any = {}


    constructor(private http: HttpClient) {}


  ngOnInit(): void {



     this.http.get<any[]>('data.json')
      .subscribe((data:any) => {

        this.banner = data.homePage.banner
        
        console.log(this.banner);
      });
  }
}
