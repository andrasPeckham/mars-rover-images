import { Component, OnInit, Input } from '@angular/core';
import {MarsRover} from '../../models/RoverResult/mars-rover';
import {MarsImageService} from '../../services/mars-image.service';
import {MarsImage} from '../../models/PhotoResult/mars-image';

@Component({
  selector: 'app-images-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.css']
})
export class ImagesContainerComponent implements OnInit {
  @Input() images: MarsImage[];
  @Input() imagesLoaded: boolean;
  @Input() firstLoad: boolean;

  ngOnInit(): void {
  }

}
