import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarsImage} from '../models/mars-image';
import {Result} from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class MarsImageService {
  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz
  roversUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  photos = '/photos';
  sol = '&sol=';
  apiKey = '?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj';
  limit = '&_limit=';

  constructor(private http: HttpClient) { }

  getRovers(): Observable<Result>{
    return this.http.get<Result>(this.roversUrl +  this.apiKey);
  }
  getPhotos(rover: string, sol: number, limit: number): Observable<MarsImage[]>{
    return this.http.get<MarsImage[]>(this.roversUrl + rover + this.photos + this.apiKey + this.sol + sol + this.limit + limit);
  }
}
