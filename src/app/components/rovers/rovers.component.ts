import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MarsImageService} from '../../services/mars-image.service';
import {exitCodeFromResult} from '@angular/compiler-cli';

@Component({
  selector: 'app-rovers',
  templateUrl: './rovers.component.html',
  styleUrls: ['./rovers.component.css']
})
export class RoversComponent implements OnInit{

  constructor(private marsService: MarsImageService) { }

  selectedRover: number;
  rovers = [
    {name: 'Spirit', imageCount: 0},
    {name: 'Opportunity', imageCount: 0},
    {name: 'Curiosity', imageCount: 0},
    {name: 'Perseverance', imageCount: 0}
  ];

  @ViewChild('button') button: ElementRef;

  ngOnInit(): void {
    this.selectedRover = 0;
    this.rovers.forEach( rover => {
      this.marsService.getRoverManifest(rover.name).subscribe(result => {
        rover.imageCount = result.photo_manifest.total_photos;
      });
    });
  }
}
