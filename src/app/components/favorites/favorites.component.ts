import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  favorites = [];

  ngOnInit(): void {
    if (typeof(Storage) !== 'undefined') {
      let tempFavorites = [];
      tempFavorites = JSON.parse(localStorage.getItem('favorites'));
      console.log(tempFavorites);
      console.log(this.favorites);
      if (tempFavorites){
        tempFavorites.forEach(favorite => {
          console.log('fav', favorite);
          console.log('fav type', typeof favorite);
          this.favorites.push(favorite);
        });
      } else {
        console.log('NO FAVORITES YET');
      }
      console.log('favorites', this.favorites);
    } else {
      console.log('Sorry! No Web Storage support..');
    }
  }

  openModalWithImage($event: any): void{
    console.log('OPEN MODAL event', $event);
  }
}
