import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecopiladorPage } from './recopilador.page';

describe('RecopiladorPage', () => {
  let component: RecopiladorPage;
  let fixture: ComponentFixture<RecopiladorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecopiladorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
