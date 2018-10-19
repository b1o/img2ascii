import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Img2asciiComponent } from './img2ascii.component';

describe('Img2asciiComponent', () => {
  let component: Img2asciiComponent;
  let fixture: ComponentFixture<Img2asciiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Img2asciiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Img2asciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
