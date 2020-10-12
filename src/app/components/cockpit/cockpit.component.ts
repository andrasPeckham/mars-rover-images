import { Component, OnInit } from '@angular/core';
import {MarsRover} from '../../models/RoverResult/mars-rover';
import {MarsImageService} from '../../services/mars-image.service';
import {MarsImage} from '../../models/PhotoResult/mars-image';
import {Photo} from '../../models/photo';
import {Camera} from '../../models/camera';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  rovers: MarsRover[];
  roverCameras: Camera[];
  images: MarsImage[] = [];
  allImages: MarsImage[] = [];
  imageManifest: Photo[];
  solsOfRoverArray: number[];
  solsOfRoverArrayLoaded: boolean;
  earthDateCorrespondingWithSol: Date;

  roversLoaded: boolean;
  imagesLoaded: boolean;
  searchCameras: boolean;

  selectedRover: string;
  selectedCamera: string;

  solNumber = 0;
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
    this.solsOfRoverArrayLoaded = false;
    this.marsImageService.getRovers().subscribe(res => {
      this.rovers = res.rovers;
      this.roversLoaded = true;
      this.selectedRover = this.rovers[0].name;
      this.roverSelected();
    });
  }

  roverSelected(): void{
    this.getSolsOfRoverArray();
    this.getCamerasOfRover();
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
      const temp = this.allImages;
      this.images = temp.slice(minMax[0], minMax[1]);
    }
    this.imagesLoaded = true;
  }

  getSolsOfRoverArray(): void{
    this.solsOfRoverArrayLoaded = false;
    const solsArray = [];
    this.marsImageService.getSolsThatHavePhotos(this.selectedRover).subscribe(object => {
      this.imageManifest = object.photo_manifest.photos;
      for (const manifest of this.imageManifest){
        solsArray.push(manifest.sol);
      }
      this.solsOfRoverArray = solsArray;
      this.solsOfRoverArrayLoaded = true;
      this.changeCorrespondingEarthDate();
    });
  }

  changeCorrespondingEarthDate(): void {
    this.earthDateCorrespondingWithSol = this.imageManifest[this.solsOfRoverArray.indexOf(Number(this.solNumber))].earth_date;
  }

  private getCamerasOfRover(): void {
    let indexOfRover;
    for (const rover of this.rovers){
      if (rover.name === this.selectedRover){
        indexOfRover = this.rovers.indexOf(rover);
      }
    }
    this.roverCameras = this.rovers[indexOfRover].cameras;
  }
}
