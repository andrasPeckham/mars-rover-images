import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggled: boolean;
  @Input() leftText: string;
  @Input() rightText: string;

  constructor() { }

  ngOnInit(): void {
    this.toggled = false;
    this.toggleEvent.emit(this.toggled);
  }

  emitToggleEvent(): void{
    console.log('before: ' + this.toggled);
    this.toggled = !this.toggled;
    this.toggleEvent.emit(this.toggled);
    console.log('after: ' + this.toggled);
  }
}
