import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNasaComponent } from './about-nasa.component';

describe('AboutNasaComponent', () => {
  let component: AboutNasaComponent;
  let fixture: ComponentFixture<AboutNasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutNasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutNasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
