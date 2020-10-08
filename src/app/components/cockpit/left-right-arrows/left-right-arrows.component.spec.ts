import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftRightArrowsComponent } from './left-right-arrows.component';

describe('LeftRightArrowsComponent', () => {
  let component: LeftRightArrowsComponent;
  let fixture: ComponentFixture<LeftRightArrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftRightArrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftRightArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
