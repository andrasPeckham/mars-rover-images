import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-left-right-arrows',
  templateUrl: './left-right-arrows.component.html',
  styleUrls: ['./left-right-arrows.component.css']
})
export class LeftRightArrowsComponent implements OnInit {
  @Input() imagesPerPage;
  @Input() sliceFrom;
  @Input() sliceTo;
  @Input() totalNumberOfImages;

  @Output() changeScliceTo: EventEmitter<number[]> = new EventEmitter<number[]>();
  constructor() { }

  ngOnInit(): void {
  }
  changeSlice(min, max): void{
    const minMax = [ min, max ];
    this.changeScliceTo.emit(minMax);
    console.log('changeScliceTo called');
    console.log('min: ' + minMax[0] + ' max: ' + minMax[1]);
  }

}
