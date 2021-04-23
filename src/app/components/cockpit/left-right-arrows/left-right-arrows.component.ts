import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-left-right-arrows',
  templateUrl: './left-right-arrows.component.html',
  styleUrls: ['./left-right-arrows.component.css']
})
export class LeftRightArrowsComponent implements OnInit {
  @Input() imagesPerPage;
  @Input() sliceFrom;
  @Input() sliceTo;
  @Input() pages: number[];
  @Input() currentPage;

  maximumPagesShown = 5;

  @Output() changePageTo: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {}

  getPagesToDisplay(): number[]{
    const currentIndex = this.pages.indexOf(this.currentPage);
    const visiblePages = [];
    let pagesIndex = Math.floor(this.maximumPagesShown / 2) * -1;
    switch (this.pages.indexOf(this.currentPage)){
      case 0:
        pagesIndex += 2;
        break;
      case 1:
        pagesIndex += 1;
        break;
      case this.pages.length - 2:
        pagesIndex -= 1;
        break;
      case this.pages.length - 1:
        pagesIndex -= 2;
        break;
      default:
    }
    for (let i = 0; i < this.maximumPagesShown; i++){
      visiblePages.push(this.pages[currentIndex + pagesIndex]);
      pagesIndex++;
    }
    return visiblePages;
  }
}
