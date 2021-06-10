import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MarsImage} from '../../../../models/PhotoResult/mars-image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() image: MarsImage;
  @Output() openModal: EventEmitter<MarsImage> = new EventEmitter<MarsImage>();

  constructor() { }

  ngOnInit(): void {
  }

}
