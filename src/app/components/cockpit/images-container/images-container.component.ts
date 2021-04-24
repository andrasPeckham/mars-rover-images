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
  @Input() firstLoad: boolean;

  images: MarsImage[];
  showModal = false;
  modalImage: MarsImage;
  currentIndexOfModalImage: number;
  loadQueryParams: boolean;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadQueryParams = true;
  }

  openModalWithImage(image: MarsImage): void {
    this.currentIndexOfModalImage = this.images.indexOf(image);
    this.modalImage = image;
    const {rover, camera, sol} = this.activeRoute.snapshot.queryParams;
    this.router.navigate(['images'], {queryParams: {rover, camera, sol, image: this.currentIndexOfModalImage}});
    this.showModal = true;
  }

  switchImage(switchTo: string): void {
    if (switchTo === 'prev' && this.currentIndexOfModalImage !== 0) {
      this.currentIndexOfModalImage--;
    }
    if (switchTo === 'next' && this.currentIndexOfModalImage !== this.images.length - 1) {
      this.currentIndexOfModalImage++;
    }
    this.router.navigate(['images'], {queryParams: {image: this.currentIndexOfModalImage}});
    this.modalImage = this.images[this.currentIndexOfModalImage];
  }
}
