import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProComponent } from './listar-pro.component';

describe('ListarProComponent', () => {
  let component: ListarProComponent;
  let fixture: ComponentFixture<ListarProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
