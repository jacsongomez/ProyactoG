import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCapComponent } from './crear-cap.component';

describe('CrearCapComponent', () => {
  let component: CrearCapComponent;
  let fixture: ComponentFixture<CrearCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
