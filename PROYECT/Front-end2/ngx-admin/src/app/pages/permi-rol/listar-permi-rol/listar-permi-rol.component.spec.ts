import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPermiRolComponent } from './listar-permi-rol.component';

describe('ListarPermiRolComponent', () => {
  let component: ListarPermiRolComponent;
  let fixture: ComponentFixture<ListarPermiRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPermiRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPermiRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
