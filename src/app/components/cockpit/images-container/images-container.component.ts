import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {MarsImage} from '../../../models/PhotoResult/mars-image';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-images-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.css']
})
export class ImagesContainerComponent implements OnInit{
  @Input() set _images(images: MarsImage[]){
    this.images = images;
    if (this.loadQueryParams){
      this.loadQueryParams = false;
      const queryParams = this.activeRoute.snapshot.queryParams;
      if (queryParams && queryParams.image){
        this.currentIndexOfModalImage = parseInt(queryParams.image, 10);
        const image = this.images[this.currentIndexOfModalImage];
        this.openModalWithImage(image);
      }
    }
  }

  @Input() imagesLoaded: boolean;

  images: MarsImage[];
  showModal = false;
  modalImage: MarsImage;
  currentIndexOfModalImage: number;
  loadQueryParams: boolean;

  currentRover;
  currentCamera;
  currentSol;
  currentPage;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadQueryParams = true;
  }

  openModalWithImage(image: MarsImage): void {
    this.currentIndexOfModalImage = this.images.indexOf(image);
    this.modalImage = image;
    const {rover, camera, sol, page} = this.activeRoute.snapshot.queryParams;
    if (rover && camera && sol && page){
      this.currentRover = rover;
      this.currentCamera = camera;
      this.currentSol = sol;
      this.currentPage = page;
    }
    this.router.navigate(['images'], {queryParams: {rover, camera, sol, page, image: this.currentIndexOfModalImage}});
    this.showModal = true;
  }

  switchImage(switchTo: string): void {
    if (switchTo === 'prev' && this.currentIndexOfModalImage !== 0) {
      this.currentIndexOfModalImage--;
    }
    if (switchTo === 'next' && this.currentIndexOfModalImage !== this.images.length - 1) {
      this.currentIndexOfModalImage++;
    }
    this.router.navigate(['images'], {
      queryParams: {
        rover: this.currentRover,
        camera: this.currentCamera,
        sol: this.currentSol,
        page: this.currentPage,
        image: this.currentIndexOfModalImage
      }
    });
    this.modalImage = this.images[this.currentIndexOfModalImage];
  }

  closeModal(): void {
    this.router.navigate(['images'], {
      queryParams: {
        rover: this.currentRover,
        camera: this.currentCamera,
        sol: this.currentSol,
        page: this.currentPage
      }
    });
    this.showModal = false;
  }
}
