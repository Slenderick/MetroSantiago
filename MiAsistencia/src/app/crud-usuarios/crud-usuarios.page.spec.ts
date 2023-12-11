import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRUDUsuariosPage } from './crud-usuarios.page';

describe('CRUDUsuariosPage', () => {
  let component: CRUDUsuariosPage;
  let fixture: ComponentFixture<CRUDUsuariosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CRUDUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
