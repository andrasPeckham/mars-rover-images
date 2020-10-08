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
  allImages: MarsImage[] = [];
  solsOfRoverArray: number[];

  roversLoaded: boolean;
  imagesLoaded: boolean;
  selectedRover: string;
  solNumber = 100;
  imagesPerPage;
  sliceFrom = 0;
  sliceTo = 100;
  firstload: boolean;

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.firstload = true;
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.imagesPerPage = 5;
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
      this.allImages = imgRes.photos;
      if (this.imagesPerPage === 'Show all'){
        this.images = this.allImages;
      } else {
        const temp = this.allImages;
        this.sliceTo = this.imagesPerPage;
        this.images = temp.slice(this.sliceFrom, this.sliceTo);
      }
      this.imagesLoaded = true;
      this.firstload = false;
    });
  }

  changeSlice(minMax: number[]): void{
    this.imagesLoaded = false;
    if (minMax[0] >= 0){
      if (minMax[1] > this.allImages.length){
        minMax[1] = this.allImages.length;
      }
      this.sliceTo = minMax[1];
      this.sliceFrom = minMax[0];
      console.log('from: ' + this.sliceFrom + ' to: ' + this.sliceTo);
      const temp = this.allImages;
      this.images = temp.slice(minMax[0], minMax[1]);
    }
    this.imagesLoaded = true;
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
