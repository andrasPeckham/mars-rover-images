import { Component, OnInit, Input } from '@angular/core';
import {MarsRover} from '../../models/mars-rover';

@Component({
  selector: 'app-images-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.css']
})
export class ImagesContainerComponent implements OnInit {
  @Input() rovers: MarsRover[];

  ngOnInit(): void {
  }
}
