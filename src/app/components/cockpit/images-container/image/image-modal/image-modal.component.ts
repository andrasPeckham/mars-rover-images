import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() imgSrc: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goToImage: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('icons') icons: ElementRef;

  iconOpacity = 0;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {}

  closeWindow(): void {
    this.closeModal.emit(true);
  }

  nextImage(): void{
    this.goToImage.emit('next');
  }

  previousImage(): void{
    this.goToImage.emit('prev');
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void{
    if (event.key === 'Escape') {
      this.closeWindow();
    }
    if (event.key === 'ArrowLeft') {
      this.previousImage();
    }
    if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }

  saveToFavorites(): void{
    let favorites: any;
    if (localStorage.getItem('favorites')){
      favorites = JSON.parse(localStorage.getItem('favorites'));
    } else {
      favorites = [];
    }
    console.log('load ', favorites);
    const temp = [];
    let alreadyContainedImage = false;
    for (const favorite of favorites.entries()){
      console.log('FAV', favorite);
      if (favorite['1'] === this.imgSrc){
        console.log('remove');
        alreadyContainedImage = true;
      } else {
        temp.push(favorite['1']);
      }
    }
    if (!alreadyContainedImage){
      temp.push(this.imgSrc);
    }
    favorites = temp;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
