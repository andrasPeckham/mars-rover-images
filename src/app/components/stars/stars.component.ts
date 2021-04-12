import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @ViewChild('svg', {static: true}) svg: ElementRef;

  constructor() { }

  stars: [
    {xPos: 1, yPos: 1, size: 0}
  ];
  top: number;

  ngOnInit(): void {
    this.stars = this.generateStars(200);
    console.log('INITIAL SCROLL Y', window.scrollY);
    const offsets = this.svg.nativeElement.getBoundingClientRect();
    this.top = offsets.top + window.pageYOffset,
    console.log('BOUNDINGCLIENT TOP ', this.top);
  }

  generateStars(sum: number): any{
    const stars = [];
    for (let i = 1; i <= sum; i++){
      const xPosition = this.getRandomInteger(0, this.svg.nativeElement.clientWidth);
      const yPosition = this.getRandomInteger(0, this.svg.nativeElement.clientHeight);
      const sizeOfStar = this.getRandomInteger(1, 3);

      const star = { xPos: xPosition, yPos: yPosition, size: sizeOfStar};
      stars.push(star);
    }
    return stars;
  }

  getRandomInteger(min, max): void {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
