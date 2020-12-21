import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  screenHeight;
  screenWidth;
  marsImageCenter;
  overSvg: boolean;
  marsCircles = [
    {dashArray: this.getDashArrayWithGap(5, 10, 1000, 70), radius: '45vh', strokeWidth: '5', forwards: true},
    {dashArray: '3, 10, 3, 10, 3, 10, 3, 10, 3, 10, 3, 10 3, 10, 3, 10, 3, 10, 3, 10, 300, 1000', radius: '50vh', strokeWidth: '3', forwards: false},
    {dashArray: '600, 600', radius: '55vh', strokeWidth: '5', forwards: true},
    {dashArray: '10, 15, 10, 15, 10, 15, 700, 1000', radius: '60vh', strokeWidth: '6', forwards: false},
    {dashArray: '5, 20, 10, 20, 30, 20, 50, 20, 30, 20, 10, 20, 5, 500', radius: '65vh', strokeWidth: '7', forwards: true},
    {dashArray: this.getDashArrayWithGap(15, 30, 1000, 50), radius: '75vh', strokeWidth: '7', forwards: false},
    {dashArray: '5, 15, 5, 15, 5, 15, 5, 15, 100, 50, 100, 50, 100, 400', radius: '90vh', strokeWidth: '8', forwards: true},
    {dashArray: '600, 600', radius: '110vh', strokeWidth: '9', forwards: false}
  ];
  constructor() { }

  @ViewChild('circle', {static: true}) circle: ElementRef;

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

  getDashArrayWithGap(line: number, gap: number, bigGap: number, repeat: number): string{
    let dashArray = '';
    for (let i = 1; i < repeat; i++){
      dashArray += line + ', ' + gap + ', ';
    }
    dashArray += line + ', ' + bigGap;
    return dashArray;
  }
  generateIsForWardMovingBool(): boolean{
    if (Math.floor(Math.random() * 2) === 0){
      return true;
    }
    return false;
  }
  generateRandomSpeed(): number{
    const max = 100;
    const min = 40;
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
