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
import {ActivatedRoute, Router} from '@angular/router';

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
  selectedSol = 0;

  imagesPerPage = 25;
  pageNumber: number;
  currentImage: number;

  loadRoverFromQueryParam: boolean;
  loadCameraFromQueryParam: boolean;
  loadSolFromQueryParam: boolean;
  loadPageFromQueryParam: boolean;


  @ViewChild('imagesContainer') imagesContainer: ElementRef;

  constructor(private marsImageService: MarsImageService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.firstload = true;
    this.roversLoaded = false;
    this.imagesLoaded = true;
    this.solsOfRoverArrayLoaded = false;
    this.pageNumber = 1;
    const {rover, camera, sol, page, image} = this.activeRoute.snapshot.queryParams;
    if ( rover && camera && sol && page){
      this.loadRoverFromQueryParam = true;
      this.loadCameraFromQueryParam = true;
      this.loadSolFromQueryParam = true;
      this.loadPageFromQueryParam = true;
      this.pageNumber = parseInt(page, 10);
      this.selectedRover = rover;
      this.selectedCamera = camera;
      this.selectedSol = parseInt(sol, 10);
      if (image){
        this.currentImage = image;
      }
    }
    this.marsImageService.getRovers().pipe(
      take(1)
    ).subscribe(res => {
      this.rovers = res.rovers;
      this.roversLoaded = true;
      if (!this.loadRoverFromQueryParam){
        this.selectedRover = this.rovers[this.rovers.length - 1].name;
      }
      this.roverSelected();
      this.searchForImages();
      this.loadRoverFromQueryParam = false;
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
      console.log('manifest', manifest);
      console.log('selectedRover', this.selectedRover);
      this.manifestOfRover = manifest;
      const photosForSol = manifest.photo_manifest.photos.find(photos => photos.sol === this.selectedSol);
      console.log(photosForSol);
      console.log(this.selectedSol);
      if (photosForSol) {
        const numberOfPhotosOnSol = Math.ceil(photosForSol.total_photos / 25);
        this.photoPages = [];
        for (let i = 1; i <= numberOfPhotosOnSol; i++) {
          this.photoPages.push(i);
        }
        console.log(this.photoPages);
      }
    });
    this.marsImageService.getPhotos(this.selectedRover, this.selectedSol, this.pageNumber, tempSelectedcamera).pipe(
      take(1)
    ).subscribe(imgRes => {
      this.allImages = imgRes.photos;
      this.imagesLoaded = true;
      this.firstload = false;
    });
  }

  changePage(changeTo: number): void{
    this.pageNumber = changeTo;
    this.updateQueryParams();
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
      if (!this.loadSolFromQueryParam){
        this.selectedSol = this.solsAndDaysOfRover.sols[0];
      }
      this.solsOfRoverArrayLoaded = true;
      this.loadSolFromQueryParam = false;
      this.updateQueryParams();
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
    if (!this.loadCameraFromQueryParam){
      this.selectedCamera = this.roverCameras[0].name;
    }
    this.loadCameraFromQueryParam = false;
    this.updateQueryParams();
  }

  updateQueryParams(): void {
    this.router.navigate(['images'], {
      queryParams: {
        rover: this.selectedRover,
        camera: this.selectedCamera,
        sol: this.selectedSol,
        page: this.pageNumber,
        image: this.currentImage
      }
    });
  }

  ngOnDestroy(): void{}

  logthis() {
    console.log('modelchange', this.selectedSol);
  }
}
