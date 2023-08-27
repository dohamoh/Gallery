import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotodetailsComponent } from './photodetails.component';

describe('PhotodetailsComponent', () => {
  let component: PhotodetailsComponent;
  let fixture: ComponentFixture<PhotodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotodetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
