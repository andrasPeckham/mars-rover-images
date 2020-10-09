import {Component, Input, OnInit} from '@angular/core';
import {MarsImage} from '../../models/mars-image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() image: MarsImage;
  showModal = false;

  constructor() { }

  ngOnInit(): void {
  }

}
