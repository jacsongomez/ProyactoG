import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuComponent } from './crear-usu.component';

describe('CrearUsuComponent', () => {
  let component: CrearUsuComponent;
  let fixture: ComponentFixture<CrearUsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
