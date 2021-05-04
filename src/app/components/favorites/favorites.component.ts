import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  favorites = [];
  noFavorites = false;
  noWebSupport = false;
  showModal = false;
  modalImage;
  imageIndex;

  ngOnInit(): void {
   this.refreshFavorites();
  }

  openModalWithImage(image: any): void{
    this.modalImage = image;
    this.imageIndex = this.favorites.indexOf(this.modalImage);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  switchImage(direction: string): void {
    console.log('SWITCHIMAGE', direction);
    if (direction === 'next' && this.imageIndex !== this.favorites.length-1){
      this.imageIndex++;
    }
    if (direction === 'prev' && this.imageIndex !== 0){
      this.imageIndex--;
    }
    this.modalImage = this.favorites[this.imageIndex];
  }

  refreshFavorites(): void {
    console.log('REFRESH');
    this.favorites = [];
    if (typeof(Storage) !== 'undefined') {
      let tempFavorites = [];
      tempFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (tempFavorites && tempFavorites.length !== 0){
        tempFavorites.forEach(favorite => {
          this.favorites.push(favorite);
        });
      } else {
        this.noFavorites = true;
      }
    } else {
      this.noWebSupport = true;
    }
    console.log('FAVORITES', this.favorites);
  }
}
