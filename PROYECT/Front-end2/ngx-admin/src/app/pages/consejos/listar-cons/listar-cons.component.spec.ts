import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConsComponent } from './listar-cons.component';

describe('ListarConsComponent', () => {
  let component: ListarConsComponent;
  let fixture: ComponentFixture<ListarConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarConsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
