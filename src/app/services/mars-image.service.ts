import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarsImage} from '../models/mars-image';
import {Result} from '../models/result';
import {ImagesResult} from '../models/images-result';

@Injectable({
  providedIn: 'root'
})
export class MarsImageService {
  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz
  roversUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  photos = '/photos';
  sol = '&sol=';
  apiKey = '?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj';

  constructor(private http: HttpClient) { }

  getRovers(): Observable<Result>{
    return this.http.get<Result>(this.roversUrl +  this.apiKey);
  }
  getPhotos(rover: string, sol: number): Observable<ImagesResult>{
    console.log('getPhotos called');

    const httpURL = this.roversUrl + '/' + rover.toLowerCase()
      + this.photos + this.apiKey + this.sol + sol;

    console.log('http get with : ' + httpURL);

    return this.http.get<ImagesResult>(this.roversUrl + '/' + rover.toLowerCase()
      + this.photos + this.apiKey + this.sol + sol);
  }
}
