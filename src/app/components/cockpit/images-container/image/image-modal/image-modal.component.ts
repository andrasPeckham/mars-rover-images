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
  @Output() favoritesModified: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('icons') icons: ElementRef;

  iconOpacity = 0;
  addedToFavorites = false;
  removedFromFavorites = false;
  popupOpacity = 0;


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
    const temp = [];
    let alreadyContainedImage = false;
    for (const favorite of favorites.entries()){
      if (favorite['1'] === this.imgSrc){
        alreadyContainedImage = true;
      } else {
        temp.push(favorite['1']);
      }
    }
    if (!alreadyContainedImage){
      temp.push(this.imgSrc);
      this.showPopup(true);
    }
    favorites = temp;
    localStorage.setItem('favorites', JSON.stringify(favorites));
    if (alreadyContainedImage){
      this.showPopup(false);
    }
  }

  showPopup(added: boolean): void {
    if (added){
      this.addedToFavorites = true;
      this.removedFromFavorites = false;
    } else {
      this.addedToFavorites = false;
      this.removedFromFavorites = true;
    }
    this.popupOpacity = 1;
    setTimeout(() => {
      this.hidePopup();
    }, 1500);
  }

  hidePopup(): void{
    this.popupOpacity = 0;
    this.favoritesModified.emit();
  }
}
