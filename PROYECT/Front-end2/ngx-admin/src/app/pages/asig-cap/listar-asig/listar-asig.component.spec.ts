import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAsigComponent } from './listar-asig.component';

describe('ListarAsigComponent', () => {
  let component: ListarAsigComponent;
  let fixture: ComponentFixture<ListarAsigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAsigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
