import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProComponent } from './crear-pro.component';

describe('CrearProComponent', () => {
  let component: CrearProComponent;
  let fixture: ComponentFixture<CrearProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
