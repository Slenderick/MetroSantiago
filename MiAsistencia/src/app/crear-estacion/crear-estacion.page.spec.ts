import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearEstacionPage } from './crear-estacion.page';

describe('CrearEstacionPage', () => {
  let component: CrearEstacionPage;
  let fixture: ComponentFixture<CrearEstacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearEstacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
