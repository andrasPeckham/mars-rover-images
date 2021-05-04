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

  ngOnInit(): void {
   this.refreshFavorites();
  }

  openModalWithImage(image: any): void{
    this.modalImage = image;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  switchImage($event: string): void {
    console.log('SWITCHIMAGE');
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
