import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetroPage } from './metro.page';

describe('MetroPage', () => {
  let component: MetroPage;
  let fixture: ComponentFixture<MetroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MetroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
