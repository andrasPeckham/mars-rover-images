import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
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
  allImages: MarsImage[] = [];
  manifestPhotos: Photo[];
  solsAndDaysOfRover: SolsAndDays;
  manifestOfRover: PhotoManifestResult;
  photoPages: number[];

  roversLoaded: boolean;
  imagesLoaded: boolean;
  searchCameras: boolean;
  solsOfRoverArrayLoaded: boolean;
  firstload: boolean;
  earthDateSelected: boolean;

  selectedRover: string;
  selectedCamera: string;

  imagesPerPage = 25;
  solNumber = 0;
  pageNumber: number;
  solOrEarthDate = 'Sols'

  @ViewChild('imagesContainer') imagesContainer: ElementRef;

  constructor(private marsImageService: MarsImageService) { }

  ngOnInit(): void {
    this.firstload = true;
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.solsOfRoverArrayLoaded = false;
    this.pageNumber = 1;
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
        const numberOfPhotosOnSol = Math.ceil(photosForSol.total_photos / 25);
        this.photoPages = [];
        for (let i = 1; i <= numberOfPhotosOnSol; i++) {
          this.photoPages.push(i);
        }
      }
    });
    this.marsImageService.getPhotos(this.selectedRover, this.solNumber, this.pageNumber, tempSelectedcamera).pipe(
      take(1)
    ).subscribe(imgRes => {
      this.allImages = imgRes.photos;
      this.imagesLoaded = true;
      this.firstload = false;
    });
  }

  changePage(changeTo: number): void{
    this.pageNumber = changeTo;
    this.searchForImages();
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
      this.solsAndDaysOfRover.earthDays = days;
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
