import { Component, OnInit } from '@angular/core';
import {MarsRover} from '../../models/mars-rover';
import { ImagesContainerComponent } from '../images-container/images-container.component';
import {MarsImageService} from '../../services/mars-image.service';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  rovers: MarsRover[];
  roversLoaded: boolean;
  selectedRover: string;

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.roversLoaded = false;
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

  refreshImages(rovers: MarsRover[]) {

  }
}
