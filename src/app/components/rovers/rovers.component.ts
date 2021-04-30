import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-rovers',
  templateUrl: './rovers.component.html',
  styleUrls: ['./rovers.component.css']
})
export class RoversComponent implements OnInit{

  constructor() { }

  selectedRover: number;
  rovers = ['Curiosity', 'Spirit', 'Opportunity', 'Perseverance'];

  @ViewChild('button') button: ElementRef;

  ngOnInit(): void {
    this.selectedRover = 0;
  }

}
