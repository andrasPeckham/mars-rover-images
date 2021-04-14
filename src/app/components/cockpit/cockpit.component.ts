import { Component, OnInit, OnDestroy } from '@angular/core';
import {MarsRover} from '../../models/RoverResult/mars-rover';
import {MarsImageService} from '../../services/mars-image.service';
import {MarsImage} from '../../models/PhotoResult/mars-image';
import {Photo} from '../../models/photo';
import {Camera} from '../../models/camera';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit, OnDestroy {
  rovers: MarsRover[];
  roverCameras: Camera[];
  images: MarsImage[] = [];
  allImages: MarsImage[] = [];
  imageManifest: Photo[];
  solsOfRoverArray: number[];

  roversLoaded: boolean;
  imagesLoaded: boolean;
  searchCameras: boolean;
  solsOfRoverArrayLoaded: boolean;
  firstload: boolean;
  earthDateSelected: boolean;

  selectedRover: string;
  selectedCamera: string;

  earthDateCorrespondingWithSol: Date;

  imagesPerPage = 25;
  solNumber = 0;
  sliceFrom = 0;
  sliceTo = 100;

  private imagesSubscription: Subscription;
  private roversSubscription: Subscription;
  private solsSubscription: Subscription;

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.firstload = true;
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.solsOfRoverArrayLoaded = false;
    this.roversSubscription = this.marsImageService.getRovers().subscribe(res => {
      this.rovers = res.rovers;
      this.roversLoaded = true;
      this.selectedRover = this.rovers[this.rovers.length - 1].name;
      this.roverSelected();
      this.refreshImages();
    });
  }

  roverSelected(): void{
    this.getSolsOfRoverArray();
    this.getCamerasOfRover();
  }

  refreshImages(): void {
    this.imagesLoaded = false;
    let tempSelectedcamera;
    if (this.selectedCamera !== 'All'){
      tempSelectedcamera = this.selectedCamera;
    }
    this.imagesSubscription = this.marsImageService.getPhotos(this.selectedRover, this.solNumber, tempSelectedcamera).subscribe(imgRes => {
      this.allImages = imgRes.photos;
      const temp = this.allImages;
      this.sliceTo = this.imagesPerPage;
      this.images = temp.slice(this.sliceFrom, this.sliceTo);
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
    this.solsSubscription = this.marsImageService.getSolsThatHavePhotos(this.selectedRover).subscribe(object => {
      this.imageManifest = object.photo_manifest.photos;
      for (const manifest of this.imageManifest){
        if (this.selectedCamera === 'All'){
          solsArray.push(manifest.sol);
        } else {
          if (manifest.cameras.includes(this.selectedCamera)) {
            solsArray.push(manifest.sol);
          }
        }
      }
      this.solsOfRoverArray = solsArray;
      this.solNumber = this.solsOfRoverArray[0];
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
    // this.roverCameras = this.rovers[indexOfRover].cameras;
    this.roverCameras = [{
      id: 0,
      name: 'All',
      rover_id: 0,
      full_name: 'All',
    }];
    this.roverCameras = _.concat(this.roverCameras, this.rovers[indexOfRover].cameras);
    this.selectedCamera = this.roverCameras[0].name;
  }

  ngOnDestroy(): void{
    this.imagesSubscription.unsubscribe();
    this.roversSubscription.unsubscribe();
    this.solsSubscription.unsubscribe();
  }

  logEarthDateSelected(): void {
    console.log(this.earthDateSelected);
  }

  getEarthDaySelectedValue($event: boolean): void {
    this.earthDateSelected = $event;
  }
}
