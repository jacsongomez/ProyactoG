import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConsComponent } from './crear-cons.component';

describe('CrearConsComponent', () => {
  let component: CrearConsComponent;
  let fixture: ComponentFixture<CrearConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearConsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
