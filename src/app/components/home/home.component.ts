import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  screenHeight;
  screenWidth;
  marsImageCenter;
  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.marsImageCenter = 0.50 * this.screenWidth + 0.4 * this.screenHeight;
  }

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.marsImageCenter = 0.50 * this.screenWidth + 0.4 * this.screenHeight;
  }

}
