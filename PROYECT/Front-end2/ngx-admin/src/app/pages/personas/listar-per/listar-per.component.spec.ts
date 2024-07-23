import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPerComponent } from './listar-per.component';

describe('ListarPerComponent', () => {
  let component: ListarPerComponent;
  let fixture: ComponentFixture<ListarPerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
