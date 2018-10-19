import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageZoneComponent } from './image-zone.component';

describe('ImageZoneComponent', () => {
  let component: ImageZoneComponent;
  let fixture: ComponentFixture<ImageZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
