import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsigComponent } from './crear-asig.component';

describe('CrearAsigComponent', () => {
  let component: CrearAsigComponent;
  let fixture: ComponentFixture<CrearAsigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAsigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
