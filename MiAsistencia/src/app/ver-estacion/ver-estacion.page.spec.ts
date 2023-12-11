import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerEstacionPage } from './ver-estacion.page';

describe('VerEstacionPage', () => {
  let component: VerEstacionPage;
  let fixture: ComponentFixture<VerEstacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerEstacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
