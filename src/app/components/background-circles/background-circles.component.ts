import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background-circles',
  templateUrl: './background-circles.component.html',
  styleUrls: ['./background-circles.component.css']
})
export class BackgroundCirclesComponent implements OnInit {

  constructor() { }

  marsCircles = [
    {dashArray: '', radius: '40px', strokeWidth: '3', forwards: false, speed: '0s', left: true},
    {dashArray: '2, 5', radius: '80px', strokeWidth: '4', forwards: true, speed: '0s', left: true},
    {dashArray: '10, 20', radius: '150px', strokeWidth: '5', forwards: false, speed: '0s', left: true},
    {dashArray: '5, 50', radius: '250px', strokeWidth: '6', forwards: true, speed: '0s', left: true},
    {dashArray: '30, 40', radius: '280px', strokeWidth: '7', forwards: true, speed: '0s', left: true},
    {dashArray: '5, 20, 10, 20, 30, 20, 50, 20', radius: '370', strokeWidth: '8', forwards: false , speed: '0s', left: true},
    {dashArray: '', radius: '470', strokeWidth: '9', forwards: false, speed: '0s', left: true},


    {dashArray: '2, 5', radius: '60px', strokeWidth: '3', forwards: false, speed: '0s', left: false},
    {dashArray: '2, 5', radius: '100px', strokeWidth: '4', forwards: true, speed: '0s', left: false},
    {dashArray: '10, 20', radius: '160px', strokeWidth: '6', forwards: false, speed: '0s', left: false},
    {dashArray: '50, 50', radius: '230', strokeWidth: '9', forwards: true, speed: '0s', left: false},
    {dashArray: '', radius: '280px', strokeWidth: '10', forwards: true, speed: '0s', left: false},
    // {dashArray: '10, 15 ', radius: '230px', strokeWidth: '6', forwards: false , speed: '35s', left: false},
    // {dashArray: '5, 20, 10, 20, 30, 20, 50, 20', radius: '300px', strokeWidth: '7', forwards: false, speed: '40', left: false},
    // {dashArray: '10, 40', radius: '450px', strokeWidth: '8', forwards: true, speed: '50', left: false},
    // {dashArray: '50, 50', radius: '500px', strokeWidth: '8', forwards: false, speed: '60', left: false}
  ];
  ngOnInit(): void {
  }

}
