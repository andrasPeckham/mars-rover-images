import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarsImage} from '../models/mars-image';
import {Result} from '../models/result';
import {ImagesResult} from '../models/images-result';
import {PhotoManifest} from '../models/photo-manifest';
import {PhotoManifestResult} from '../models/photo-manifest-result';

@Injectable({
  providedIn: 'root'
})
export class MarsImageService {
  nasaApiUrl = 'https://api.nasa.gov/mars-photos/api/v1';
  roversUrl = '/rovers/';
  photos = '/photos';
  sol = '&sol=';
  apiKey = '?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj';
  manifests = '/manifests/';


  constructor(private http: HttpClient) { }

  getRovers(): Observable<Result>{
    return this.http.get<Result>(this.nasaApiUrl + this.roversUrl +  this.apiKey);
  }
  getPhotos(rover: string, sol: number): Observable<ImagesResult>{
    return this.http.get<ImagesResult>(this.nasaApiUrl + this.roversUrl  + rover
      + this.photos + this.apiKey + this.sol + sol);
  }
  getSolsThatHavePhotos(rover: string): Observable<PhotoManifestResult>{
    return this.http.get<PhotoManifestResult>(this.nasaApiUrl + this.manifests + rover + this.apiKey);
  }
  // getLatestPhotos(): Observable<ImagesResult>{
  //   // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj
  //   return this.http.get<ImagesResult>
  //   ('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj');
  // }
}
