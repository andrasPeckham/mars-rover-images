import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  @Input() imgSrc: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goToImage: EventEmitter<string> = new EventEmitter<string>();

  loggedClicks: string[] = [];

  constructor() { }

  ngOnInit(): void {}

  closeWindow(): void {
    this.closeModal.emit(true);
  }

  nextImage(): void{
    this.goToImage.emit('next');
  }

  previousImage(): void{
    this.goToImage.emit('prev');
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void{
    if (event.key === 'Escape') {
      this.closeWindow();
    }
    if (event.key === 'ArrowLeft') {
      this.previousImage();
    }
    if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }
}
