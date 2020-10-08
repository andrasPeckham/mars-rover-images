import { Component, OnInit } from '@angular/core';
import {MarsRover} from '../../models/mars-rover';
import { ImagesContainerComponent } from '../images-container/images-container.component';
import {MarsImageService} from '../../services/mars-image.service';
import {MarsImage} from '../../models/mars-image';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  rovers: MarsRover[];
  images: MarsImage[] = [];
  roversLoaded: boolean;
  imagesLoaded: boolean;
  selectedRover: string;
  solNumber = 100;
  imagesPerPage = 5;

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.marsImageService.getRovers().subscribe(res => {
      this.rovers = res.rovers;
      console.log('subscribed event finished');
      this.roversLoaded = true;
      this.selectedRover = this.rovers[0].name;
    });
    console.log('ngOnInit finished');
  }

  roverSelected(): void{
    console.log(this.selectedRover);
  }

  refreshImages(): void {
    this.imagesLoaded = false;
    console.log('refreshImages called');
    this.marsImageService.getPhotos(this.selectedRover, this.solNumber).subscribe(imgRes => {
      this.images = imgRes.photos.slice(0, this.imagesPerPage);
      this.imagesLoaded = true;
    });
  }
}
