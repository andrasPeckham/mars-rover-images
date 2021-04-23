import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarsImage} from '../models/PhotoResult/mars-image';
import {Result} from '../models/RoverResult/result';
import {ImagesResult} from '../models/PhotoResult/images-result';
import {PhotoManifest} from '../models/ManifestResult/photo-manifest';
import {PhotoManifestResult} from '../models/ManifestResult/photo-manifest-result';

@Injectable({
  providedIn: 'root'
})
export class MarsImageService {
  nasaApiUrl = 'https://api.nasa.gov/mars-photos/api/v1';
  apiKey = 'E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj';
  manifests = '/manifests/';

  constructor(private http: HttpClient) { }

  getRovers(): Observable<Result>{
    return this.http.get<Result>( this.nasaApiUrl + '/rovers', {
      params: {
        api_key: this.apiKey
      }
    });
  }


  getPhotos(rover: string, sol: number, page: number, camera?: string): Observable<ImagesResult>{
    let params: any;
    params = {
      api_key: 'E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj',
      sol: sol.toString(),
      page: page.toString()
    };
    if (camera){
      params.camera = camera.toString();
    }
    return this.http.get<ImagesResult>(this.nasaApiUrl + '/rovers/'  + rover
      + '/photos', {
      params
    });
  }

  getRoverManifest(rover: string): Observable<PhotoManifestResult>{
    return this.http.get<PhotoManifestResult>(this.nasaApiUrl + '/manifests/' + rover, {
      params: {
        api_key: this.apiKey
      }
    });
  }
  // https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj&sol=0

  // getLatestPhotos(): Observable<ImagesResult>{
  //   // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj
  //   return this.http.get<ImagesResult>
  //   ('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=E3qash6cEd3SaoTdIjTyHjGzJHF2INcONp9uG5yj');
  // }
}
