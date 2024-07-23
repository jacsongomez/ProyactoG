import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPerComponent } from './crear-per.component';

describe('CrearPerComponent', () => {
  let component: CrearPerComponent;
  let fixture: ComponentFixture<CrearPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
