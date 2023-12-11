import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCombinacionPage } from './crear-combinacion.page';

describe('CrearCombinacionPage', () => {
  let component: CrearCombinacionPage;
  let fixture: ComponentFixture<CrearCombinacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearCombinacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
