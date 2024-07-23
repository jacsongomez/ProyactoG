import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuComponent } from './listar-usu.component';

describe('ListarUsuComponent', () => {
  let component: ListarUsuComponent;
  let fixture: ComponentFixture<ListarUsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
