import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() imgSrc: string;
  @Output() closeButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() imgDirection: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.closeButton.emit('close');
  }

  changeImgTo(dir: string): void{
    this.imgDirection.emit(dir);
  }
}
