import { Component, OnInit } from '@angular/core';
import {MarsRover} from '../../models/mars-rover';
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
  solsOfRoverArray: number[];

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.marsImageService.getRovers().subscribe(res => {
      this.rovers = res.rovers;
      this.roversLoaded = true;
      this.selectedRover = this.rovers[0].name;
      this.roverSelected();
    });
  }

  roverSelected(): void{
    this.getSolsOfRoverArray();
  }

  refreshImages(): void {
    this.imagesLoaded = false;
    this.marsImageService.getPhotos(this.selectedRover, this.solNumber).subscribe(imgRes => {
      this.images = imgRes.photos.slice(0, this.imagesPerPage);
      this.imagesLoaded = true;
    });
  }

  getSolsOfRoverArray(): void{
    const solsArray = [];
    let currentRoverIndex;
    for (const rvr of this.rovers){
      if (rvr.name === this.selectedRover){
        currentRoverIndex = this.rovers.indexOf(rvr);
      }
    }
    for (let i = 0; i < this.rovers[currentRoverIndex].max_sol; i++){
      solsArray.push(i);
    }
    this.solsOfRoverArray = solsArray;
  }
}
