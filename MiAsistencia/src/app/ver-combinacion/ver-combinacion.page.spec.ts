import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerCombinacionPage } from './ver-combinacion.page';

describe('VerCombinacionPage', () => {
  let component: VerCombinacionPage;
  let fixture: ComponentFixture<VerCombinacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerCombinacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
