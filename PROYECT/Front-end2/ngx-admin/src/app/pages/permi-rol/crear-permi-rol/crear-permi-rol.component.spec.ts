import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPermiRolComponent } from './crear-permi-rol.component';

describe('CrearPermiRolComponent', () => {
  let component: CrearPermiRolComponent;
  let fixture: ComponentFixture<CrearPermiRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPermiRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPermiRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
