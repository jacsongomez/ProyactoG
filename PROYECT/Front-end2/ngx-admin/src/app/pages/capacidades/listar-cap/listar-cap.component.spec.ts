import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCapComponent } from './listar-cap.component';

describe('ListarCapComponent', () => {
  let component: ListarCapComponent;
  let fixture: ComponentFixture<ListarCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
