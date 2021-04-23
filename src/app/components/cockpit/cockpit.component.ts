import { Component, OnInit, OnDestroy } from '@angular/core';
import {MarsRover} from '../../models/RoverResult/mars-rover';
import {MarsImageService} from '../../services/mars-image.service';
import {MarsImage} from '../../models/PhotoResult/mars-image';
import {Photo} from '../../models/photo';
import {Camera} from '../../models/camera';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {PhotoManifestResult} from '../../models/ManifestResult/photo-manifest-result';
import {SolsAndDays} from '../../models/sols-and-days';

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
  manifestPhotos: Photo[];
  solsAndDaysOfRover: SolsAndDays;
  manifestOfRover: PhotoManifestResult;
  numberOfPhotosOnSol: number;

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

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.firstload = true;
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.solsOfRoverArrayLoaded = false;
    this.marsImageService.getRovers().pipe(
      take(1)
    ).subscribe(res => {
      this.rovers = res.rovers;
      this.roversLoaded = true;
      this.selectedRover = this.rovers[this.rovers.length - 1].name;
      this.roverSelected();
      this.searchForImages();
    });
  }

  roverSelected(): void{
    this.getSolsOfRoverArray();
    this.getCamerasOfRover();
  }

  searchForImages(): void {
    this.imagesLoaded = false;
    let tempSelectedcamera;
    if (this.selectedCamera !== 'All'){
      tempSelectedcamera = this.selectedCamera;
    }
    this.marsImageService.getRoverManifest(this.selectedRover).pipe(
      take(1)
    ).subscribe( manifest => {
      this.manifestOfRover = manifest;
      const photosForSol = manifest.photo_manifest.photos.find(photos => photos.sol === this.solNumber);
      if (photosForSol) {
        this.numberOfPhotosOnSol = photosForSol.total_photos;
      }
    });
    this.marsImageService.getPhotos(this.selectedRover, this.solNumber, tempSelectedcamera).pipe(
      take(1)
    ).subscribe(imgRes => {
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
    const sols = [];
    const days = [];
    this.solsAndDaysOfRover = {
      sols: [],
      earthDays: []
    };
    this.marsImageService.getRoverManifest(this.selectedRover).pipe(
      take(1)
    ).subscribe(object => {
      this.manifestPhotos = object.photo_manifest.photos;
      this.manifestPhotos.forEach(manifest => {
        if (this.selectedCamera === 'All' || manifest.cameras.includes(this.selectedCamera)){
          sols.push(manifest.sol);
          days.push(manifest.earth_date);
        }
      });
      this.solsAndDaysOfRover.sols = sols;
      this.solNumber = this.solsAndDaysOfRover.sols[0];
      this.solsOfRoverArrayLoaded = true;
    });
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
    this.rovers[indexOfRover].cameras.forEach(camera => {
      this.roverCameras.push(camera);
    });
    this.selectedCamera = this.roverCameras[0].name;
  }

  ngOnDestroy(): void{}

}
